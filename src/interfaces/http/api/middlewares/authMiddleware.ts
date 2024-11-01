
import { Request, Response, NextFunction } from "express";
import TokenManager from "../../../../infrastructures/services/TokenManager";
import AuthenticationError from "../../../../domain/exceptions/AuthenticationError";
import AuthorizationError from "../../../../domain/exceptions/AuthorizationError";

interface CustomRequest extends Request {
  payload?: string | object
}
export default function authMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const tokenManager = new TokenManager();
  const authHeader = req.headers.authorization
  if (!authHeader) {
    throw new AuthenticationError('Unauthorized')
  }
  const accessToken = authHeader?.split(' ')[1]
  if (!accessToken) {
    throw new AuthenticationError('Unauthorized')
  }
  try {
    const payload = tokenManager.verifyAccessToken(accessToken)
    req.payload = payload
    const { id } = req.payload as { id: string }
    if (!id) {
      throw new AuthorizationError('You are not authorized to access this resource')
    }
    next()
  } catch (error) {
    next(error)
  }
}