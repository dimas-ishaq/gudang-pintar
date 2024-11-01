import CreateItemUseCase from "../../../../application/usecase/item/CreateItemUseCase";
import CreateTransactionUseCase from "../../../../application/usecase/transaction/CreateTransactionUseCase";
import GetAllTransactionUseCase from "../../../../application/usecase/transaction/GetAllTransactionUseCase";
import { Request, Response, NextFunction, query } from "express";
import { createTransactionSchema } from "../validations/transactionSchema";
import BadRequestError from "../../../../domain/exceptions/BadRequestError";
import { nanoid } from "nanoid";
import UpdateStockUseCase from "../../../../application/usecase/product/UpdateStockUseCase";
import GetProductUseCase from "../../../../application/usecase/product/GetProductUseCase";
import NotFoundError from "../../../../domain/exceptions/NotFoundError";




export default class TransactionController {

  constructor(
    private createTransactionUseCase: CreateTransactionUseCase,
    private getAllTransactionUseCase: GetAllTransactionUseCase,
    private createItemUseCase: CreateItemUseCase,
    private updateStockUseCase: UpdateStockUseCase,
    private getProductUseCase: GetProductUseCase
  ) { }

  async createTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = createTransactionSchema.validate(req.body)
      if (error) {
        throw new BadRequestError(error.message)
      }
      const { userId, type, date, details } = req.body

      const findProduct = details.map(async (item: { productId: string; }) => {
        return await this.getProductUseCase.execute(item.productId)
      })
      await Promise.all(findProduct)
      const transaction_id = `transaction-${nanoid(16)}`
      const transaction = await this.createTransactionUseCase.execute({ id: transaction_id, user_id: userId, type, date })
      const items = details.map(async (item: { productId: string; quantity: number; price: number; }) => {
        const item_id = `item-${nanoid(16)}`
        if (type === 'sale') {
          await this.updateStockUseCase.execute({ id: item.productId, quantity: item.quantity })
        }
        return await this.createItemUseCase.execute({ id: item_id, transaction_id: transaction_id, product_id: item.productId, quantity: item.quantity, price: item.price })
      })
      const createdItem = await Promise.all(items)

      return res.status(201).json({
        status: "success",
        message: "Transaction created successfully",
        data: {
          transactionId: transaction.id,
          userId: transaction.user_id,
          type: transaction.type,
          date: transaction.date,
          details: createdItem.map((item: { product_id: string; quantity: string; price: number; }) => ({
            productId: item.product_id,
            quantity: item.quantity,
            price: item.price
          }))
        }
      })
    } catch (error) {
      next(error)
    }
  }

  async getAllTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const { transactions, items } = await this.getAllTransactionUseCase.execute();
      const transactionsMap: { transactionId: string; type: string; date: string; totalAmount: number; details: any[] }[] = [];

      transactions.forEach((element: { id: string; type: string; date: string | Date; }) => {
        const transactionId = element.id;
        const transactionType = element.type;
        const transactionDate = new Date(element.date).toISOString(); // Format date to ISO string

        // Filter items related to the current transaction
        const itemFiltered = items.filter((item: { transaction_id: string; }) => item.transaction_id === transactionId);

        // Initialize total amount for this transaction
        let totalAmount = 0;

        // Create details array
        const details = itemFiltered.map((item: { product_id: string; quantity: number; price: number; }) => {
          const amount = item.quantity * item.price; // Calculate amount for the item
          totalAmount += amount; // Add to total amount

          return {
            productId: item.product_id,
            quantity: item.quantity,
            price: item.price
          };
        });

        // Create transaction object
        const transaction = {
          transactionId: transactionId,
          type: transactionType,
          date: transactionDate,
          totalAmount: totalAmount,
          details: details
        };

        transactionsMap.push(transaction);
      });

      return res.status(200).json({
        status: 'success',
        data: transactionsMap
      });
    } catch (error) {
      next(error);
    }
  }



}