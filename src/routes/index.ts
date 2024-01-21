import {FastifyInstance} from "fastify";
import { AuthController } from '../controllers/authController'

const authController = new AuthController()

export async function router(fastify: FastifyInstance) {
    fastify.route({
        method: 'POST',
        url: '/register',
        handler: authController.register,
    })
    fastify.route({
        method: 'POST',
        url: '/login',
        handler: authController.login,
    })
}
