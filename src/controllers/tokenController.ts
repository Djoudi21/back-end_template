import { InMemoryAuthRepository } from '../repositories/inMemoryAuthRepository'
import {
  VerifyRefreshTokenValidityUseCase
} from '../use-cases/auth/verifyRefreshTokenValidityUseCase/verifyRefreshTokenValidityUseCase'
import { InMemoryTokenRepository } from '../repositories/inMemoryTokenRepository'

export class TokenController {
  async verifyRefreshToken(req: any, reply: any): Promise<any> {
    // const refreshToken = req.body.data
    // const tokenRepository = new InMemoryTokenRepository()
    // const verifyRefreshTokenValidityUseCase = new VerifyRefreshTokenValidityUseCase(tokenRepository)
    // const response = await verifyRefreshTokenValidityUseCase.execute(refreshToken)
    // reply.status(response.data.status).send(response)
  }
}
