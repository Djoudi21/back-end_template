import { InMemoryAuthRepository } from '../repositories/inMemoryAuthRepository'
import { RegisterUserUseCase } from '../use-cases/auth/registerUserUseCase/registerUserUseCase'
import { LoginUserUseCase } from '../use-cases/auth/logUserUseCase/loginUserUseCase'

export class AuthController {
  async register(req: any, reply: any): Promise<any> {
    const credentials = req.body.data
    const authRepository = new InMemoryAuthRepository()
    const registerUseCase = new RegisterUserUseCase(authRepository)
    const response = await registerUseCase.execute(credentials)
    reply.send(response)
  }

  async login(req: any, reply: any): Promise<any> {
    const credentials = req.body.data
    const authRepository = new InMemoryAuthRepository()
    const loginUserUseCase = new LoginUserUseCase(authRepository)
    const response = await loginUserUseCase.execute(credentials)
    reply.send(response)
  }
}
