import { type HelloWorldRepository } from '../../../repositories/interfaces/helloWorldRepository'
import { type SayHelloResponse } from '../../../repositories/inMemoryHelloWorldRepository'

export class HelloWorldUseCase {
  helloWorldRepository: HelloWorldRepository
  constructor(helloWorldRepository: HelloWorldRepository) {
    this.helloWorldRepository = helloWorldRepository
  }

  async execute(): Promise<SayHelloResponse> {
    return await this.helloWorldRepository.sayHello()
  }
}
