import { AuthRepository } from '../../../repositories/interfaces/authRepository'

export class LogoutUserUseCase {
  authRepository: AuthRepository
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }
  execute() {
    return this.authRepository.logout()
  }
}
