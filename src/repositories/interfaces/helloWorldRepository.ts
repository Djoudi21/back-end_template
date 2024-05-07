import { type SayHelloResponse } from '../inMemoryHelloWorldRepository'

export interface HelloWorldRepository {
  sayHello: () => Promise<SayHelloResponse>
}
