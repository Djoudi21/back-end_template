import { InMemoryTokenRepository } from '../repositories/inMemoryTokenRepository'
import { GenerateAccessTokenUseCase } from '../use-cases/token/generateAccessTokenUseCase/generateAccessTokenUseCase'


export class TokenController {
  async generateAccess(req: any, reply: any) {
    const { refreshToken } = req.body.data;
    const tokenRepository = new InMemoryTokenRepository()
    const generateAccessTokenUseCase = new GenerateAccessTokenUseCase(tokenRepository)
    const response = await generateAccessTokenUseCase.execute(refreshToken)
    reply.status(response.data.status).send(response)
  }

  toto(req: any, reply: any) {
    const response = Promise.resolve()
    reply.status(200).send(response)
  }
}
