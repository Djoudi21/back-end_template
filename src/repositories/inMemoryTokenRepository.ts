import { TokenRepository } from './interfaces/tokenRepository'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import {
  GenerateAccessTokenResponse,
  GenerateAccessTokenResponseError,
} from '../use-cases/token/generateAccessTokenUseCase/types'

const isTestingEnvironment = process.env.NODE_ENV === 'test';
const secretKey:  Secret | undefined = isTestingEnvironment ? 'testing_secret':  process.env.JWT_SECRET;
const refreshExpiresIn:  string | number | undefined =  isTestingEnvironment ? '1m': process.env.JWT_REFRESH_EXPIRATION_TIME

export class InMemoryTokenRepository implements TokenRepository{

  generateAccessToken(refreshToken: string): Promise<GenerateAccessTokenResponse | GenerateAccessTokenResponseError> {
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
      const accessToken = jwt.sign({ username: 'user' }, secretKey, { expiresIn: refreshExpiresIn });
      const response: GenerateAccessTokenResponse = {
        data: {
          status: 200,
          tokens: {
            accessToken,
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
}
