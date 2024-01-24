import { User } from '../registerUserUseCase/types'

export type LoginUseCaseResponse = {
  data: User
} & {token: string}
