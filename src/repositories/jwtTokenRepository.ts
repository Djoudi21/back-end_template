import { TokenRepository } from './interfaces/tokenRepository'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import {
  GenerateAccessTokenResponse,
  GenerateAccessTokenResponseError, SignTokenPayload,
} from '../use-cases/token/generateAccessTokenUseCase/types'

const isTestingEnvironment = process.env.NODE_ENV === 'test';
const secretKey:  Secret | undefined = isTestingEnvironment ? 'testing_secret':  process.env.JWT_SECRET;
const refreshExpiresIn:  string | number | undefined =  isTestingEnvironment ? '1m': process.env.JWT_REFRESH_EXPIRATION_TIME

export class JwtTokenRepository implements TokenRepository{
  regenerateAccessToken(refreshToken: string): Promise<GenerateAccessTokenResponse | GenerateAccessTokenResponseError> {
    if (!refreshToken || !secretKey) {
      const response: GenerateAccessTokenResponseError = {
        data: {
          status: 401,
          message: "Unauthorized",
        },
      }
      return Promise.resolve(response)
    }

    try {
      jwt.verify(refreshToken, secretKey) as JwtPayload;
      const payload = {
        email: 'email'
      }
      const accessToken = this.sign(payload, refreshExpiresIn)
      const response: GenerateAccessTokenResponse = {
        data: {
          status: 200,
          tokens: {
            accessToken: accessToken ?? '',
            refreshToken
          }
        },
      }
      return Promise.resolve(response)
    } catch (err) {
      const response: GenerateAccessTokenResponseError = {
        data: {
          status: 403,
          message: "Forbidden",
        },
      }
      return Promise.resolve(response)
    }
  }

  sign (payload: SignTokenPayload, expiresIn: string | number | undefined) {
    if(!secretKey) return
    return jwt.sign(payload, secretKey, { expiresIn } as jwt.SignOptions)
  }
}

