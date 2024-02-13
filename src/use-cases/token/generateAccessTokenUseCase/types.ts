export interface GenerateAccessTokenResponse {
  data: {
    status: 200
    tokens: {
      accessToken: string,
      refreshToken: string
    }
  }
}

export interface SignTokenPayload{
  [key: string]: any
}

export interface GenerateAccessTokenResponseError {
  data: {
    status: 403 | 401,
    message: "Forbidden" | "Unauthorized",
  }
}
