import { Router } from "express";
import CategoryRepositoryPostgres from "../../../../infrastructures/repository/CategoryRepositoryPostgres";
import CreateCategoryUseCase from "../../../../application/usecase/category/CreateCategoryUseCase";
import GetAllCategoryUseCase from "../../../../application/usecase/category/GetAllCategoryUseCase";
import UpdateCategoryUseCase from "../../../../application/usecase/category/UpdateCategoryUseCase";
import DeleteCategoryUseCase from "../../../../application/usecase/category/DeleteCategoryUseCase";
import CategoryController from "../controllers/CategoryController";
import authMiddleware from "../middlewares/authMiddleware";



const router = Router();
const categoryRepository = new CategoryRepositoryPostgres();
const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
const getAllCategoryUseCase = new GetAllCategoryUseCase(categoryRepository);
const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);
const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);

const categoryController = new CategoryController(
  createCategoryUseCase,
  getAllCategoryUseCase,
  updateCategoryUseCase,
  deleteCategoryUseCase
)

router.post('/', authMiddleware, async (req, res, next) => {
  await categoryController.createCategory(req, res, next)
})
router.get('/', authMiddleware, async (req, res, next) => {
  await categoryController.getAllCategory(req, res, next)
})
router.put('/:id', authMiddleware, async (req, res, next) => {
  await categoryController.updateCategory(req, res, next)
})
router.delete('/:id', authMiddleware, async (req, res, next) => {
  await categoryController.deleteCategory(req, res, next)
})


export default router