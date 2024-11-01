
import { Request, Response, NextFunction } from "express";
import { createProductSchema } from "../validations/productSchema";
import BadRequestError from "../../../../domain/exceptions/BadRequestError";
import { nanoid } from "nanoid";
import CreateProductUseCase from "../../../../application/usecase/product/CreateProductUseCase";
import GetProductUseCase from "../../../../application/usecase/product/GetProductUseCase";
import GetAllProductUseCase from "../../../../application/usecase/product/GetAllProductUseCase";
import UpdateProductUseCase from "../../../../application/usecase/product/UpdateProductUseCase";
import DeleteProductUseCase from "../../../../application/usecase/product/DeleteProductUseCase";
import NotFoundError from "../../../../domain/exceptions/NotFoundError";
import Product from "../../../../domain/entities/Product";
import GetCategoryUseCase from "../../../../application/usecase/category/GetCategoryUseCase";
export default class ProductController {

  constructor(
    private createProductUseCase: CreateProductUseCase,
    private getProductUseCase: GetProductUseCase,
    private getAllProductUseCase: GetAllProductUseCase,
    private updateProductUseCase: UpdateProductUseCase,
    private deleteProductUseCase: DeleteProductUseCase,
    private getCategoryUseCase: GetCategoryUseCase
  ) { }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = createProductSchema.validate(req.body)
      if (error) {
        throw new BadRequestError(error.message)
      }
      const id = `product-${nanoid(16)}`
      const product = await this.createProductUseCase.execute({ id, ...req.body, category_id: req.body.categoryId, })
      return res.status(201).json({
        status: 'success',
        message: 'Product created successfully',
        data: {
          productId: product.id,
          name: product.name,
          categoryId: product.category_id,
          price: product.price,
          stock: product.stock,
          description: product.description
        }
      })
    } catch (error) {
      next(error)
    }
  }

  async getProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      if (!id) {
        throw new NotFoundError('Id product not found')
      }
      const product = await this.getProductUseCase.execute(id)
      return res.status(200).json({
        status: 'success',
        data: {
          productId: product.id,
          name: product.name,
          category: product.category_name,
          price: product.price,
          stock: product.stock,
          description: product.description
        }
      })
    } catch (error) {
      next(error)
    }
  }

  async getAllProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await this.getAllProductUseCase.execute()
      return res.status(200).json({
        status: 'success',
        data: products.map((product) => ({
          productId: product.id,
          name: product.name,
          category: product.category_name,
          price: product.price,
          stock: product.stock,
        }))
      })
    } catch (error) {
      next(error)
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      if (!id) {
        throw new NotFoundError('Id product not found')
      }
      const updated_at = new Date().toISOString()
      const product = await this.updateProductUseCase.execute({ id, ...req.body, updated_at })
      return res.status(200).json({
        status: 'success',
        message: 'Product updated successfully',
        data: {
          productId: product.id,
          name: product.name,
          categoryId: product.category_id,
          price: product.price,
          stock: product.stock,
          description: product.description
        }
      })
    } catch (error) {
      next(error)
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      if (!id) {
        throw new NotFoundError('Id product not found')
      }
      await this.deleteProductUseCase.execute(id)
      res.status(200).json({
        status: 'success',
        message: 'Product deleted successfully'
      })
    } catch (error) {
      next(error)
    }
  }

}