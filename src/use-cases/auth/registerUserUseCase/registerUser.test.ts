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
      email: 'john.doe@gmail.com',
      password: 'password'
    }

    // ACT
    const createdUser = await registerUserUseCase.execute(newUser)

    // ASSERT
    expect(createdUser.data.status).toBe(201)
    expect(createdUser.data.message).toBe('User successfully registered')
  })
  it("should not register a user if exists", async () => {
    // ARRANGE
    await authRepository.register({
      email: 'john.doe@gmail.com',
      password: 'password'
    })
    const newUser = {
      email: 'john.doe@gmail.com',
      password: 'password'
    }

    // ACT
    const createdUser = await registerUserUseCase.execute(newUser)

    // ASSERT
    expect(createdUser.data.status).toBe(409)
    expect(createdUser.data.message).toBe('User already exists')
  })
})
