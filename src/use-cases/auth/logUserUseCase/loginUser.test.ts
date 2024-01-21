import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryAuthRepository } from '../../../repositories/inMemoryAuthRepository'
import { AuthRepository } from '../../../repositories/interfaces/authRepository'
import { LoginUserUseCase } from './loginUserUseCase'


describe('register use case', () => {
  let authRepository: AuthRepository
  let loginUserUseCase: LoginUserUseCase
  beforeEach(() => {
    authRepository = new InMemoryAuthRepository()
    loginUserUseCase = new LoginUserUseCase(authRepository)
  })
  it("should login a user if exists", async () => {
    // ARRANGE
    const newUser = {
      name:'Joe',
      email: 'john.doe@gmail.com',
      password: 'password'
    }
    await authRepository.register(newUser)

    const userToLog = {
      email: 'john.doe@gmail.com',
      password: 'password'
    }
    // ACT
    const loggedUser = await loginUserUseCase.execute(userToLog)
    // ASSERT
    expect(loggedUser.data).toStrictEqual({
      name: 'Joe',
      email: 'john.doe@gmail.com',
      id: 1
    })
  })
})
