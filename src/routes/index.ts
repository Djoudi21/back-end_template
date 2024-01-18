import {FastifyInstance} from "fastify";

export async function router(fastify: FastifyInstance) {
    fastify.route({
        method: 'GET',
        url: '/',
        handler: function (request, reply) {
            reply.send({ hello: 'world' })
        },
    })
}
