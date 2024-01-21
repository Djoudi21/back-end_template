import { describe, it, expect, beforeEach } from 'vitest'
import {  RegisterUserUseCase } from './registerUserUseCase'
import { InMemoryAuthRepository } from '../../../repositories/inMemoryAuthRepository'
import { AuthRepository } from '../../../repositories/interfaces/authRepository'


describe('register use case', () => {
  let authRepository: AuthRepository
  let registerUserUseCase: RegisterUserUseCase
  beforeEach(() => {
    authRepository = new InMemoryAuthRepository()
    registerUserUseCase = new RegisterUserUseCase(authRepository)
  })
  it("should register a user if doesn't exists", async () => {
    // ARRANGE
    const newUser = {
      name: 'John',
      email: 'john.doe@gmail.com',
      password: 'password'
    }
    // ACT
    const createdUser = await registerUserUseCase.execute(newUser)
    // ASSERT
    expect(createdUser.data).toStrictEqual({
      name: 'John',
      email: 'john.doe@gmail.com',
      id: 1
    })
  })
  it("should not register a user if exists", async () => {
    // ARRANGE
    await authRepository.register({
      name: 'John',
      email: 'john.doe@gmail.com',
      password: 'password'
    })
    const newUser = {
      name: 'John',
      email: 'john.doe@gmail.com',
      password: 'password'
    }
    // ACT
    const users = await registerUserUseCase.execute(newUser)
    // ASSERT
    expect(users.length).toBe(1)
  })
})
