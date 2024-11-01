import { Request, Response, NextFunction } from "express"
import GetTransactionReportUseCase from "../../../../application/usecase/report/GetTransactionReportUseCase";
import BadRequestError from "../../../../domain/exceptions/BadRequestError";
import { reportSchema } from "../validations/reportSchema";
import GetItemReportUseCase from "../../../../application/usecase/report/GetItemReportUseCase";
import { nanoid } from "nanoid";
import GetStockReportUseCase from "../../../../application/usecase/report/GetStockReportUseCase";


export default class ReportController {
  constructor(
    private getTransactionReportUseCase: GetTransactionReportUseCase,
    private getItemReportUseCase: GetItemReportUseCase,
    private getStockReportUseCase: GetStockReportUseCase
  ) { }

  async getAllTransactionByQuery(req: Request, res: Response, next: NextFunction) {
    try {
      const { start_date, end_date, type } = req.query
      const { error } = reportSchema.validate(req.query)
      if (error) {
        throw new BadRequestError(error.message)
      }
      const id = `report-${nanoid(16)}`
      const transactions = await this.getTransactionReportUseCase.execute({
        start_date: "",
        end_date: "",
        type: "",
        ...req.query,
      })
      const transactionsMap: { transactionId: any; date: any; details: any; }[] = await Promise.all(transactions.map(async (e: { id: any; date: any; }) => {
        const transactionId = e.id;
        const date = e.date;
        const details = await this.getItemReportUseCase.execute(transactionId);


        return {
          transactionId,
          date,
          details,
        };
      }));

      return res.status(200).json({
        status: 'success',
        data: {
          reportId: id,
          start_date: start_date,
          end_date: end_date,
          transaction_type: type,
          transactions: transactionsMap
        }

      })
    } catch (error) {
      next(error)
    }

  }

  async getAllStockByCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { category } = req.query as { category: string }
      if (!category) {
        throw new BadRequestError('Category not found')
      }
      const stocks = await this.getStockReportUseCase.execute(category)
      return res.status(200).json({
        status: 'success',
          data: {
          category: category,
          stocks
        }
      })
    } catch (error) {
      next(error)
    }
  }
}