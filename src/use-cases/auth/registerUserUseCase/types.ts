export type NewUser = {
  name: string,
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

export type RegisterUserResponse = {
  data: User
}

export type ExistingUser = NewUser & {id: number}

export type ExistingUsers = ExistingUser[]
