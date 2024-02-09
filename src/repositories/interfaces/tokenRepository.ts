export interface TokenRepository {
  verifyRefreshToken: (refreshToken: string) => Promise<any>
}
