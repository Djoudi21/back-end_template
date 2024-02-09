import {
  Credentials,
  NewUser,
  RegisterUserResponse,
} from '../../use-cases/auth/registerUserUseCase/types'

export interface AuthRepository {
  register: (user: NewUser) => Promise<RegisterUserResponse>
  login: (credentials: Credentials) => Promise<any>
  logout: () => Promise<any>
}
