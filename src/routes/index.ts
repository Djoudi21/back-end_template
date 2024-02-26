import { type FastifyInstance } from 'fastify'
import { AuthController } from '../controllers/authController'
import { TokenController } from '../controllers/tokenController'

const authController = new AuthController()
const tokenController = new TokenController()

export async function router (fastify: FastifyInstance): Promise<void> {
  fastify.route({
    method: 'POST',
    url: '/api/v1/register',
    handler: async (request, reply) => { await authController.register(request, reply) }
  })
  fastify.route({
    method: 'POST',
    url: '/api/v1/login',
    handler: async (request, reply) => { await authController.login(request, reply) }
  })
  fastify.route({
    method: 'GET',
    url: '/api/v1/logout',
    handler: async (request, reply) => { await authController.logout(request, reply) }
  })
  fastify.route({
    method: 'POST',
    url: '/generate-access',
    handler: async (request, reply) => { await tokenController.generateAccess(request, reply) }
  })
}
