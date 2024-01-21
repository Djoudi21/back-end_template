import { Credentials, ExistingUser, ExistingUsers, NewUser } from '../use-cases/auth/registerUserUseCase/types'
import { AuthRepository } from './interfaces/authRepository'

export class InMemoryAuthRepository implements AuthRepository {
  public users: ExistingUsers = []

  register(user: NewUser): Promise<any> {
    const isExistingUser = this.users.find(existingUser => existingUser.name === user.name)
    if(isExistingUser) {
      return Promise.resolve(this.users)
    }
    this.users.push({ ...user, id: 1 })
    const { password, ...rest } = this.users.slice(-1)[0]
    const response = {data: { ...rest }}
    return Promise.resolve(response)
  }

  login(credentials: Credentials): Promise<any> {
    const isExistingUser = this.users.find(user => user.email === credentials.email)
    if(!isExistingUser) {
      throw new Error('No user found')
    }
    const response = {
      data: {
        name: isExistingUser.name,
        email:isExistingUser.email,
        id:1
      }
    }
    return Promise.resolve(response)
  }
}
