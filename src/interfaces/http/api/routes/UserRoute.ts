import { Router } from "express";
import UserRepositoryPostgres from "../../../../infrastructures/repository/UserRepositoryPostgres";
import CreateUserUseCase from "../../../../application/usecase/user/CreateUserUseCase";
import GetUserUseCase from "../../../../application/usecase/user/GetUserUseCase";
import UpdateUserUseCase from "../../../../application/usecase/user/UpdateUserUseCase";
import DeleteUserUseCase from "../../../../application/usecase/user/DeleteUserUseCase";
import UserController from "../controllers/UserController";
import PasswordHash from "../../../../infrastructures/services/PasswordHash";
import adminMiddleware from "../middlewares/adminMiddleware";
import GetAllUserUseCase from "../../../../application/usecase/user/GetAllUserUseCase";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();
const userRepository = new UserRepositoryPostgres();
const createUserUseCase = new CreateUserUseCase(userRepository);
const getUserUseCase = new GetUserUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const passwordHash = new PasswordHash();
const getAllUserUseCase = new GetAllUserUseCase(userRepository);

const userController = new UserController(
  createUserUseCase,
  getUserUseCase,
  updateUserUseCase,
  deleteUserUseCase,
  passwordHash,
  getAllUserUseCase
);

// user routing

router.get('/auth/users', authMiddleware, async (req, res, next) => {
  await userController.getUser(req, res, next)
})
router.put('/auth/users', authMiddleware, async (req, res, next) => {
  await userController.updateUser(req, res, next)
})

// admin routing
router.post('/admin/users', adminMiddleware, async (req, res, next) => {
  await userController.createUser(req, res, next)
})
router.get('/admin/users/:id', adminMiddleware, async (req, res, next) => {
  await userController.getUserById(req, res, next)
})
router.get('/admin/users', adminMiddleware, async (req, res, next) => {
  await userController.getAllUser(req, res, next)
})
router.put('/admin/users/:id', adminMiddleware, async (req, res, next) => {
  await userController.updateUserById(req, res, next)
})
router.delete('/admin/users/:id', adminMiddleware, async (req, res, next) => {
  await userController.deleteUser(req, res, next)
})



export default router