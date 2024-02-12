import {
  Credentials,
  NewUser,
  RegisterUserResponse,
} from '../../use-cases/auth/registerUserUseCase/types'
import { LoginUserResponse, LoginUserResponseError } from '../../types'

export interface AuthRepository {
  register: (user: NewUser) => Promise<RegisterUserResponse>
  login: (credentials: Credentials) =>  Promise<LoginUserResponse | LoginUserResponseError>
  logout: () => Promise<any>
}
