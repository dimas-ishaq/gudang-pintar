import { Router } from "express";
import ProductRepositoryPostgres from "../../../../infrastructures/repository/ProductRepositoryPostgres";
import GetInventoryUseCase from "../../../../application/usecase/inventory/GetInventoryUseCase";
import UpdateInventoryUseCase from "../../../../application/usecase/inventory/UpdateInventoryUseCase";
import InventoryController from "../controllers/InventoryController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

const productRepository = new ProductRepositoryPostgres();
const getInventoryUseCase = new GetInventoryUseCase(productRepository);
const updateInventoryUseCase = new UpdateInventoryUseCase(productRepository);


const inventoryController = new InventoryController(
  getInventoryUseCase,
  updateInventoryUseCase
)

router.get('/', authMiddleware, async (req, res, next) => {
  await inventoryController.getInventory(req, res, next)
})

router.put('/', authMiddleware, async (req, res, next) => {
  await inventoryController.updateInventory(req, res, next)
})

export default router