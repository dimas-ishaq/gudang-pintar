import { Router } from "express";
import TransactionRepositoryPostgres from "../../../../infrastructures/repository/TransactionRepositoryPostgres";
import GetTransactionReportUseCase from "../../../../application/usecase/report/GetTransactionReportUseCase";
import ReportController from "../controllers/ReportController";
import adminMiddleware from "../middlewares/adminMiddleware";
import GetItemReportUseCase from "../../../../application/usecase/report/GetItemReportUseCase";
import ItemRepositoryPostgres from "../../../../infrastructures/repository/ItemRepositoryPostgres";
import GetStockReportUseCase from "../../../../application/usecase/report/GetStockReportUseCase";

const router = Router()

const transactionRepository = new TransactionRepositoryPostgres();
const itemRepository = new ItemRepositoryPostgres()
const getTransactionReportUseCase = new GetTransactionReportUseCase(transactionRepository);
const getItemReportUseCase = new GetItemReportUseCase(itemRepository)
const getStockReportUseCase = new GetStockReportUseCase(transactionRepository)
const reportController = new ReportController(
  getTransactionReportUseCase, getItemReportUseCase, getStockReportUseCase
)

router.get('/transaction', adminMiddleware, async (req, res, next) => {
  await reportController.getAllTransactionByQuery(req, res, next)
})

router.get('/stock', adminMiddleware, async (req, res, next) => {
  await reportController.getAllStockByCategory(req, res, next)
})

export default router