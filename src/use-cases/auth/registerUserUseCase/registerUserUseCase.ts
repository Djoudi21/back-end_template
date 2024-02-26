import { type NewUser, type RegisterUserResponse, type RegisterUserResponseError } from './types'
import { type AuthRepository } from '../../../repositories/interfaces/authRepository'

export class RegisterUserUseCase {
  authRepository: AuthRepository
  constructor (authRepository: AuthRepository) {
    this.authRepository = authRepository
  }

  async execute (user: NewUser): Promise<RegisterUserResponse | RegisterUserResponseError> {
    return await this.authRepository.register(user)
  }
}
