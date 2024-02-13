import {
  Credentials,
  ExistingUsers,
  NewUser, RegisterUserResponse,
  RegisterUserResponseError,
} from '../use-cases/auth/registerUserUseCase/types'
import { AuthRepository } from './interfaces/authRepository'
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import { LoginUserResponse, LoginUserResponseError } from '../use-cases/auth/logUserUseCase/types'


// Check if the code is running in a testing environment
const isTestingEnvironment = process.env.NODE_ENV === 'test';
const secretKey:  Secret | undefined = isTestingEnvironment ? 'testing_secret':  process.env.JWT_SECRET;
const refreshExpiresIn:  string | number | undefined =  isTestingEnvironment ? '1m': process.env.JWT_REFRESH_EXPIRATION_TIME
const accessExpiresIn:  string | number | undefined =  isTestingEnvironment ? '1m': process.env.JWT_ACCESS_EXPIRATION_TIME

export class InMemoryAuthRepository implements AuthRepository {
  public users: ExistingUsers = [{email: 'a@aa.com', password: '$2b$10$c8RlA86Wpdxcf1hdrs6SZepYlSkT7YAZVLnFmsemahBNfsLjhdT/e', id: 1}]

  async register(user: NewUser): Promise<RegisterUserResponse | RegisterUserResponseError> {
    // Check if the user already exists
    const existingUser = this.users.find(existingUser => existingUser.email === user.email)

    // If exists return promise with conflict error message
    if (existingUser) {
      const response: RegisterUserResponseError = {
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

    if (!secretKey) throw new Error('NO SECRET')


    // Finally return promise with created user without password
    const accessToken = jwt.sign({ email: user.email }, secretKey, { expiresIn: accessExpiresIn } as jwt.SignOptions);
    const refreshToken = jwt.sign({ email: user.email }, secretKey, { expiresIn: refreshExpiresIn } as jwt.SignOptions);
    const response: RegisterUserResponse = {
      data: {
        status: 201,
        message: "User successfully registered",
        user: {
          ...rest
        },
      },
      tokens: {
        accessToken,
        refreshToken
      }
    }
    return Promise.resolve(response)
  }

  async login(credentials: Credentials): Promise<LoginUserResponse | LoginUserResponseError> {
    // Check if the user exists
    const user = this.users.find(user => user.email === credentials.email)

    // If it doesn't exist return promise with not found error message
    if (!user) {
      const response: LoginUserResponseError = {
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
      const response: LoginUserResponseError = {
        data: {
          status: 401,
          message: "Unauthorized",
        },
      }
      return Promise.resolve(response)
    }

    // If it exists return promise with found user with tokens and without password
    const accessToken = jwt.sign({ email: credentials.email }, secretKey, { expiresIn: accessExpiresIn } as jwt.SignOptions);
    const refreshToken = jwt.sign({ email: credentials.email }, secretKey, { expiresIn: refreshExpiresIn } as jwt.SignOptions);
    const response: LoginUserResponse = {
      data: {
        status: 200,
        user: {
          email: user.email,
          id: 1
        }
      },
      tokens: {
        accessToken,
        refreshToken
      }
    }
    return Promise.resolve(response)
  }

  async logout(): Promise<any> {
    const response = {
      data: {
        status: 200,
        message: "User logged out successfully",
      },
    }
    return Promise.resolve(response)
  }
}
