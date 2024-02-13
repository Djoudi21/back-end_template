import { describe, it, expect, beforeEach } from 'vitest'
import { VerifyRefreshTokenValidityUseCase } from './verifyRefreshTokenValidityUseCase'
import { TokenRepository } from '../../../repositories/interfaces/tokenRepository'
import { JwtTokenRepository } from '../../../repositories/jwtTokenRepository'


describe('verify refresh token use case', () => {
  let tokenRepository: TokenRepository
  let verifyTokensUseCase: VerifyRefreshTokenValidityUseCase
  beforeEach(() => {
    tokenRepository = new JwtTokenRepository()
    verifyTokensUseCase = new VerifyRefreshTokenValidityUseCase(tokenRepository)
  })
  it("should register a user if doesn't exists", async () => {
    // ARRANGE
    const refreshToken = 'sdf'
    // ACT
    const response = await verifyTokensUseCase.execute(refreshToken)
    // ASSERT
    expect(response).toBeDefined()
  })
})
