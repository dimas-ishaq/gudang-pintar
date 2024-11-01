import { Router } from "express";
import CreateTransactionUseCase from "../../../../application/usecase/transaction/CreateTransactionUseCase";
import TransactionRepositoryPostgres from "../../../../infrastructures/repository/TransactionRepositoryPostgres";
import GetAllTransactionUseCase from "../../../../application/usecase/transaction/GetAllTransactionUseCase";
import TransactionController from "../controllers/TransactionController";
import CreateItemUseCase from "../../../../application/usecase/item/CreateItemUseCase";
import ItemRepositoryPostgres from "../../../../infrastructures/repository/ItemRepositoryPostgres";
import authMiddleware from "../middlewares/authMiddleware";
import UpdateStockUseCase from "../../../../application/usecase/product/UpdateStockUseCase";
import ProductRepositoryPostgres from "../../../../infrastructures/repository/ProductRepositoryPostgres";
import GetProductUseCase from "../../../../application/usecase/product/GetProductUseCase";


const router = Router();

const transactionRepository = new TransactionRepositoryPostgres();
const itemRepository = new ItemRepositoryPostgres();
const productRepository = new ProductRepositoryPostgres()
const createTransactionUseCase = new CreateTransactionUseCase(transactionRepository);
const getAllTransactionUseCase = new GetAllTransactionUseCase(transactionRepository);
const createItemUseCase = new CreateItemUseCase(itemRepository);
const updateStockUseCase = new UpdateStockUseCase(productRepository)
const getProductUseCase = new GetProductUseCase(productRepository)

const transactionController = new TransactionController(
  createTransactionUseCase,
  getAllTransactionUseCase,
  createItemUseCase,
  updateStockUseCase,
  getProductUseCase
)

router.post('/', authMiddleware, async (req, res, next) => {
  await transactionController.createTransaction(req, res, next)
})
router.get('/', authMiddleware, async (req, res, next) => {
  await transactionController.getAllTransaction(req, res, next)
})

export default router