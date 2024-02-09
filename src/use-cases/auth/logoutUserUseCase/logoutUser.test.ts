import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryAuthRepository } from '../../../repositories/inMemoryAuthRepository'
import { AuthRepository } from '../../../repositories/interfaces/authRepository'
import { LogoutUserUseCase } from './logoutUserUseCase'


describe('logout use case', () => {
  let authRepository: AuthRepository
  let logoutUserUseCase: LogoutUserUseCase
  beforeEach(() => {
    authRepository = new InMemoryAuthRepository()
    logoutUserUseCase = new LogoutUserUseCase(authRepository)
  })
  it("should log out a user", async () => {
    // ARRANGE
    await authRepository.logout()

    // ACT
    const response = await logoutUserUseCase.execute()

    // ASSERT
    expect(response.data.status).toBe(200)
  })
})
