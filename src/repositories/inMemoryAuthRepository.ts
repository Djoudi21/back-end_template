import { Credentials, ExistingUsers, NewUser } from '../use-cases/auth/registerUserUseCase/types'
import { AuthRepository } from './interfaces/authRepository'
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'


// Check if the code is running in a testing environment
const isTestingEnvironment = process.env.NODE_ENV === 'test';
const secretKey:  Secret | undefined = isTestingEnvironment ? 'testing_secret':  process.env.JWT_SECRET;
const expiresIn:  string | number | undefined =  isTestingEnvironment ? '1m': process.env.JWT_EXPIRATION_TIME

export class InMemoryAuthRepository implements AuthRepository {
  public users: ExistingUsers = [{email: 'a@a.com', password: '$2b$10$c8RlA86Wpdxcf1hdrs6SZepYlSkT7YAZVLnFmsemahBNfsLjhdT/e', id: 1}]

  async register(user: NewUser): Promise<any> {
    // Check if the user already exists
    const existingUser = this.users.find(existingUser => existingUser.email === user.email)

    // If exists return promise with conflict error message
    if (existingUser) {
      const response = {
        data: {
          status: 409,
          message: "User already exists",
        },
      }
      return Promise.resolve(response)
    }

    // Otherwise compare passwords
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Then add user to in-memory DB with hashed password
    this.users.push({ ...user, password: hashedPassword, id: 1 })
    const { password, ...rest } = this.users.slice(-1)[0]

    // Finally return promise with created user without password
    const response = {
      data: {
        status: 201,
        message: "User successfully registered",
        user: {
          ...rest
        },
      },
    }
    return Promise.resolve(response)
  }

  async login(credentials: Credentials): Promise<any> {
    // Check if the user exists
    const user = this.users.find(user => user.email === credentials.email)

    // If it doesn't exist return promise with not found error message
    if (!user) {
      const response = {
        data: {
          status: 404,
          message: "No user found",
        },
      }
      return Promise.resolve(response)
    }

    // Otherwise check if secret key exits and throw error if it doesn't
    if (!secretKey) throw new Error('NO SECRET')

    // If secret key exits compare passwords
    const passwordMatch = await bcrypt.compare(credentials.password, user.password);
    if (!passwordMatch) {
      const response = {
        data: {
          status: 401,
          message: "Unauthorized",
        },
      }
      return Promise.resolve(response)
    }

    // If it exists return promise with found user with token and without password
    const token = jwt.sign({ email: credentials.email }, secretKey, { expiresIn } as jwt.SignOptions);
    const response = {
      data: {
        status: 200,
        email: user.email,
        id: 1
      },
      token
    }
    return Promise.resolve(response)
  }
}
