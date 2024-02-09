import { TokenRepository } from '../../../repositories/interfaces/tokenRepository'

export class VerifyRefreshTokenValidityUseCase {
  tokenRepository: TokenRepository
  constructor(tokenRepository: TokenRepository) {
    this.tokenRepository = tokenRepository
  }

  async execute(refreshToken: string) {
    return await this.tokenRepository.verifyRefreshToken(refreshToken)
  }
}
