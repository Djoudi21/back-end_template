import { SignTokenPayload } from '../../use-cases/token/generateAccessTokenUseCase/types'

export interface TokenRepository {
  regenerateAccessToken: (refreshToken: string) => Promise<any>
  sign: (payload: SignTokenPayload, expiresIn: string | number | undefined) => string | undefined
}
