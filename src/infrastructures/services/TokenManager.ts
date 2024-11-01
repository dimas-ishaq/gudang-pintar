
import jwt from 'jsonwebtoken'
import AuthenticationError from '../../domain/exceptions/AuthenticationError'

interface Token {
  accessToken: string,
  refreshToken: string
}
export default class TokenManager {

  generateToken(id: string, role: string) {
    if (process.env.ACCESS_TOKEN_SECRET && process.env.REFRESH_TOKEN_SECRET) {
      const accessToken = jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
      const refreshToken = jwt.sign({ id, role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
      return { accessToken, refreshToken }
    }
  }

  generateAccessToken(id: string, role: string) {
    if (process.env.ACCESS_TOKEN_SECRET) {
      return jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
    }
  }

  verifyAccessToken(accessToken: string) {
    if (process.env.ACCESS_TOKEN_SECRET) {
      try {
        return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
      } catch (error) {
        throw new AuthenticationError('Unauthorized')
      }
    }
  }
  verifyRefreshToken(refreshToken: string) {
    if (process.env.REFRESH_TOKEN_SECRET) {
      try {
        return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
      } catch (error) {
        throw new AuthenticationError('Unauthorized')
      }
    }
  }
}