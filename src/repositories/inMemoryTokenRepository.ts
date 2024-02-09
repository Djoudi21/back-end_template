import { TokenRepository } from './interfaces/tokenRepository'

export class InMemoryTokenRepository implements TokenRepository{
  verifyRefreshToken(refreshToken: string): Promise<any> {
    return Promise.resolve(undefined)
  }
}
