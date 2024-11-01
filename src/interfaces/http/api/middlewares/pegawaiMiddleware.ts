
import { Request, Response, NextFunction } from "express";
import AuthenticationError from "../../../../domain/exceptions/AuthenticationError";
import TokenManager from "../../../../infrastructures/services/TokenManager";
import AuthorizationError from "../../../../domain/exceptions/AuthorizationError";


interface CustomRequest extends Request {
  payload?: string | object; // Sesuaikan dengan tipe data dari payload token
}
export default function pegawaiMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const tokenManager = new TokenManager();
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AuthenticationError('Missing Authorization header')
  }
  const accessToken = authHeader?.split(' ')[1]
  if (!accessToken) {
    throw new AuthenticationError('Missing Access Token')
  }
  try {
    const payload = tokenManager.verifyAccessToken(accessToken)
    req.payload = payload
    const { role } = req.payload as { role: string }
    if (!role || role !== 'Pegawai') {
      throw new AuthenticationError('You are not authorized to access this resource')
    }
    next();
  } catch (error) {
    next(error)

  }
}