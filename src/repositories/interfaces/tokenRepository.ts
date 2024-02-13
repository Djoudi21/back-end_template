export interface TokenRepository {
  generateAccessToken: (refreshToken: string) => Promise<any>
}
