import { type FastifyInstance } from 'fastify'
import { HelloWorldController } from '../controllers/helloWorldController'

const helloWorldController = new HelloWorldController()

export async function router(fastify: FastifyInstance): Promise<void> {
  fastify.route({
    method: 'GET',
    url: '/api/v1/hello-world',
    handler: async (request, reply) => {
      await helloWorldController.sayHello(request, reply)
    },
  })
}
