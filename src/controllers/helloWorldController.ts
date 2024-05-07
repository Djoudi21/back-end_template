import { InMemoryHelloWorldRepository } from '../repositories/inMemoryHelloWorldRepository'
import { HelloWorldUseCase } from '../use-cases/hello-world/helloWorldUseCase/helloWorldUseCase'

export class HelloWorldController {
  async sayHello(req: any, reply: any): Promise<void> {
    const helloWorldRepository = new InMemoryHelloWorldRepository()
    const sayHelloUseCase = new HelloWorldUseCase(helloWorldRepository)
    const response = await sayHelloUseCase.execute()
    reply.status(response.data.status).send(response)
  }
}
