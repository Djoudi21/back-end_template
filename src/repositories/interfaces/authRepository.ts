import { Credentials, ExistingUser, NewUser } from '../../use-cases/auth/registerUserUseCase/types'
import { RegisterUserResponse } from '../../types'

export interface AuthRepository {
  register: (user: NewUser) => Promise<RegisterUserResponse>
  login: (credentials: Credentials) => Promise<any>
}
