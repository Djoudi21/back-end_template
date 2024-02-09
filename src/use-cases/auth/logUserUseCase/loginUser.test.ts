import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryAuthRepository } from '../../../repositories/inMemoryAuthRepository'
import { AuthRepository } from '../../../repositories/interfaces/authRepository'
import { LoginUserUseCase } from './loginUserUseCase'
import { log } from 'node:util'


describe('register use case', () => {
  let authRepository: AuthRepository
  let loginUserUseCase: LoginUserUseCase
  const user = {
    email: 'john.doe@gmail.com',
    password: 'password'
  }
  beforeEach(() => {
    authRepository = new InMemoryAuthRepository()
    loginUserUseCase = new LoginUserUseCase(authRepository)
  })
  it("should login a user if it exists", async () => {
    // ARRANGE
    await authRepository.register(user)

    // ACT
    const loggedUser = await loginUserUseCase.execute(user)

    // ASSERT
    expect(loggedUser.token).toBeDefined()
    expect(loggedUser.token).toBeTruthy()
    expect(loggedUser.data).toStrictEqual({
      email: 'john.doe@gmail.com',
      id: 1
    })
  })
  it("should not login a user if it doesn't exists", async () => {
    // ARRANGE
    await authRepository.register(user)
    const userToLog = {
      email: 'jane.doe@gmail.com',
      password: 'password'
    }

    // ACT
    const res = await loginUserUseCase.execute(userToLog)

    // ASSERT
    expect(res.token).toBeUndefined()
    expect(res.data.status).toBe(404)
    expect(res.data.message).toBe('No user found')
  })
})
