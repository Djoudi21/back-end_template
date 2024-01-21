import { AuthRepository } from '../../../repositories/interfaces/authRepository'
import { Credentials, ExistingUser, NewUser } from '../registerUserUseCase/types'

export class LoginUserUseCase {
  authRepository: AuthRepository
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }
  execute(credentials: Credentials) {
    return this.authRepository.login(credentials)
  }
}
