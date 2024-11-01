import { Router } from "express";
import LoginUseCase from "../../../../application/usecase/auth/LoginUseCase";
import RegisterUseCase from "../../../../application/usecase/auth/RegisterUseCase";
import UserRepositoryPostgres from "../../../../infrastructures/repository/UserRepositoryPostgres";
import TokenManager from "../../../../infrastructures/services/TokenManager";
import AuthController from "../controllers/AuthController";
import PasswordHash from "../../../../infrastructures/services/PasswordHash";
import SessionRepositoryPostgres from "../../../../infrastructures/repository/SessionRepositoryPostgres";
import LogoutUseCase from "../../../../application/usecase/auth/LogoutUseCase";
import authMiddleware from "../middlewares/authMiddleware";


const router = Router();
const userRepository = new UserRepositoryPostgres();
const tokenManager = new TokenManager();
const passwordHash = new PasswordHash();
const sessionRepository = new SessionRepositoryPostgres();
const loginUseCase = new LoginUseCase(userRepository, tokenManager, passwordHash, sessionRepository);
const registerUseCase = new RegisterUseCase(userRepository);
const logoutUseCase = new LogoutUseCase(sessionRepository);

const authController = new AuthController(
  loginUseCase, registerUseCase, passwordHash, logoutUseCase
);

router.post('/register', async (req, res, next) => {
  authController.register(req, res, next)
})

router.post('/login', async (req, res, next) => {
  authController.login(req, res, next)
})
router.delete('/logout', authMiddleware, async (req, res, next) => {
  authController.logout(req, res, next)
})

export default router