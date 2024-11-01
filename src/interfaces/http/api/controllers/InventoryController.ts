import { Request, Response, NextFunction } from "express";
import GetInventoryUseCase from "../../../../application/usecase/inventory/GetInventoryUseCase";
import Inventory from "../../../../domain/entities/Inventory";
import NotFoundError from "../../../../domain/exceptions/NotFoundError";
import { updateStockProductSchema } from "../validations/productSchema";
import BadRequestError from "../../../../domain/exceptions/BadRequestError";
import UpdateInventoryUseCase from "../../../../application/usecase/inventory/UpdateInventoryUseCase";


export default class InventoryController {
  constructor(
    private getInventoryUseCase: GetInventoryUseCase,
    private updateInventoryUseCase: UpdateInventoryUseCase
  ) { }

  async getInventory(req: Request, res: Response, next: NextFunction) {
    try {
      const inventory = await this.getInventoryUseCase.execute()
      return res.status(200).json({
        status: 'success',
        data: inventory.map((product) => ({
          productId: product.id,
          name: product.name,
          stock: product.stock
        }))
      })
    } catch (error) {
      next(error)
    }
  }

  async updateInventory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      if (!id) {
        throw new NotFoundError('Id product not found')
      }
      const { stock } = req.body
      const { error } = updateStockProductSchema.validate(stock)
      if (error) {
        throw new BadRequestError(error.message)
      }
      const updated_at = new Date().toISOString()
      await this.updateInventoryUseCase.execute({ id, stock, updated_at })
      return res.status(200).json({
        status: 'success',
        message: 'Stock updated successfully'
      })
    } catch (error) {
      next(error)

    }
  }
}