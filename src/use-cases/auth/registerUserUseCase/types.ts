export type NewUser = {
  name: string,
  email: string,
  password: string
}

export type Credentials = {
  email: string,
  password: string
}

export type ExistingUser = NewUser & {id: number}

export type ExistingUsers = ExistingUser[]
