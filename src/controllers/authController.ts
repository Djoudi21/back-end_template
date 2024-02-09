import { InMemoryAuthRepository } from '../repositories/inMemoryAuthRepository'
import { RegisterUserUseCase } from '../use-cases/auth/registerUserUseCase/registerUserUseCase'
import { LoginUserUseCase } from '../use-cases/auth/logUserUseCase/loginUserUseCase'
import {
  VerifyRefreshTokenValidityUseCase
} from '../use-cases/auth/verifyRefreshTokenValidityUseCase/verifyRefreshTokenValidityUseCase'
import { LogoutUserUseCase } from '../use-cases/auth/logoutUserUseCase/logoutUserUseCase'
import { getTokenFromHeaders } from '../utils'

export class AuthController {
  async register(req: any, reply: any): Promise<any> {
    const credentials = req.body.data
    const authRepository = new InMemoryAuthRepository()
    const registerUseCase = new RegisterUserUseCase(authRepository)
    const response = await registerUseCase.execute(credentials)
    reply.status(response.data.status).send(response)
  }

  async login(req: any, reply: any): Promise<any> {
    const credentials = req.body.data
    const authRepository = new InMemoryAuthRepository()
    const loginUserUseCase = new LoginUserUseCase(authRepository)
    const response = await loginUserUseCase.execute(credentials)
    reply.status(response.data.status).send(response)
  }

  async logout(req: any, reply: any): Promise<any> {
    const authRepository = new InMemoryAuthRepository()
    const logoutUserUseCase = new LogoutUserUseCase(authRepository)
    await logoutUserUseCase.execute()
    const response = await logoutUserUseCase.execute()
    reply.status(response.data.status).send(response)
  }
}
