import { TokenRepository } from '../../../repositories/interfaces/tokenRepository'
import { GenerateAccessTokenResponse, GenerateAccessTokenResponseError } from './types'

export class GenerateAccessTokenUseCase {
  tokenRepository: TokenRepository
  constructor(tokenRepository: TokenRepository) {
    this.tokenRepository = tokenRepository
  }
  execute(refreshToken: string): Promise<GenerateAccessTokenResponse | GenerateAccessTokenResponseError> {
    return this.tokenRepository.generateAccessToken(refreshToken)
  }
}
