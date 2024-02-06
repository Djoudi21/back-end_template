import { Credentials, ExistingUsers, NewUser } from '../use-cases/auth/registerUserUseCase/types'
import { AuthRepository } from './interfaces/authRepository'
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'


// Check if the code is running in a testing environment
const isTestingEnvironment = process.env.NODE_ENV === 'test';
const secretKey:  Secret | undefined = isTestingEnvironment ? 'testing_secret':  process.env.JWT_SECRET;
const expiresIn:  string | number | undefined =  isTestingEnvironment ? '1m': process.env.JWT_EXPIRATION_TIME

export class InMemoryAuthRepository implements AuthRepository {
  public users: ExistingUsers = []

  async register(user: NewUser): Promise<any> {
    // Check if the user already exists
    const isExistingUser = this.users.find(existingUser => existingUser.name === user.name)
    if (isExistingUser) {
      // Return promise with created user without password
      const response = {
        data: {
          status: "error",
          message: "User already exists",
        },
      }
      return Promise.resolve(response)
    }

    // Encrypt the password before saving it
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Add user to in-memory DB with hashed password
    this.users.push({ ...user, password: hashedPassword, id: 1 })
    const { password, ...rest } = this.users.slice(-1)[0]

    // Return promise with created user without password
    const response = {
      data: {
        status: "success",
        message: "User successfully registered",
        user: {
          ...rest
        },
      },
    }
    return Promise.resolve(response)
  }

  login(credentials: Credentials): Promise<any> {
    // Check if the user already exists
    const isExistingUser = this.users.find(user => user.email === credentials.email)
    if(!isExistingUser) throw new Error('No user found')

    if(!secretKey) throw new Error('NO SECRET')

    // Generate a JWT token for the registered user
    const token = jwt.sign({ email: credentials.email }, secretKey, { expiresIn } as jwt.SignOptions);

    // Return promise with found user without password
    const response = {
      data: {
        name: isExistingUser.name,
        email:isExistingUser.email,
        id:1
      },
      token
    }
    return Promise.resolve(response)
  }
}
