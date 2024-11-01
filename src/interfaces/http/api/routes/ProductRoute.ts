import { Router } from "express";
import ProductRepositoryPostgres from "../../../../infrastructures/repository/ProductRepositoryPostgres";
import CreateProductUseCase from "../../../../application/usecase/product/CreateProductUseCase";
import GetProductUseCase from "../../../../application/usecase/product/GetProductUseCase";
import GetAllProductUseCase from "../../../../application/usecase/product/GetAllProductUseCase";
import UpdateProductUseCase from "../../../../application/usecase/product/UpdateProductUseCase";
import DeleteProductUseCase from "../../../../application/usecase/product/DeleteProductUseCase";
import ProductController from "../controllers/ProductController";
import authMiddleware from "../middlewares/authMiddleware";
import CategoryRepositoryPostgres from "../../../../infrastructures/repository/CategoryRepositoryPostgres";
import GetCategoryUseCase from "../../../../application/usecase/category/GetCategoryUseCase";


const router = Router();

const productRepository = new ProductRepositoryPostgres();
const categoryRepository = new CategoryRepositoryPostgres();
const createProductUseCase = new CreateProductUseCase(productRepository);
const getProductUseCase = new GetProductUseCase(productRepository);
const getAllProductUseCase = new GetAllProductUseCase(productRepository);
const updateProductUseCase = new UpdateProductUseCase(productRepository);
const deleteProductUseCase = new DeleteProductUseCase(productRepository);
const getCategoryUseCase = new GetCategoryUseCase(categoryRepository)


const productController = new ProductController(
  createProductUseCase,
  getProductUseCase,
  getAllProductUseCase,
  updateProductUseCase,
  deleteProductUseCase,
  getCategoryUseCase
)

// user && admin routing
router.post('/', authMiddleware, async (req, res, next) => {
  await productController.createProduct(req, res, next)
})

router.get('/:id', authMiddleware, async (req, res, next) => {
  await productController.getProduct(req, res, next)
})

router.get('/', authMiddleware, async (req, res, next) => {
  await productController.getAllProduct(req, res, next)
})

router.put('/:id', authMiddleware, async (req, res, next) => {
  await productController.updateProduct(req, res, next)
})

router.delete('/:id', authMiddleware, async (req, res, next) => {
  await productController.deleteProduct(req, res, next)
})

export default router