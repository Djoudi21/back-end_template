export interface SayHelloResponse {
  data: {
    message: string
    status: 200 | 500
  }
}
export class InMemoryHelloWorldRepository {
  async sayHello(): Promise<SayHelloResponse> {
    return await new Promise<SayHelloResponse>((resolve) => {
      resolve({ data: { message: 'Hello World', status: 200 } })
    })
  }
}
