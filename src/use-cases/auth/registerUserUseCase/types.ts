export type NewUser = {
  email: string,
  password: string
}

export type Credentials = {
  email: string,
  password: string
}

export type User = {
  name: string
  email: string
  id: number
}

export type ExistingUser = NewUser & {id: number}

export type ExistingUsers = ExistingUser[]

export type RegisterUserResponse = {
  data: {
    status: 201 | 409 | 500
    message: string
    user: {
      id: number
      email: string
    }
  }
}
