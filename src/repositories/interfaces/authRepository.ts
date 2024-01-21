import { Credentials, ExistingUser, NewUser } from '../../use-cases/auth/registerUserUseCase/types'

export interface AuthRepository {
  register: (user: NewUser) => Promise<any>
  login: (credentials: Credentials) => Promise<any>
}
