import { type AuthRepository } from '../../../repositories/interfaces/authRepository'
import { type Credentials } from '../registerUserUseCase/types'
import { type LoginUserResponse, type LoginUserResponseError } from './types'

export class LoginUserUseCase {
  authRepository: AuthRepository
  constructor (authRepository: AuthRepository) {
    this.authRepository = authRepository
  }

  async execute (credentials: Credentials): Promise<LoginUserResponse | LoginUserResponseError> {
    return await this.authRepository.login(credentials)
  }
}
