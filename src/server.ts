import Fastify from 'fastify'
import 'dotenv/config'
import {router} from './routes'
const port = Number(process.env.PORT)
const host = process.env.HOST
const fastify = Fastify({
    logger: true
})

fastify.register(router)

// Run the server!
fastify.listen({ port, host  }, function (err: any, address: any) {
    if (err) {
        fastify.log.error(err)
    }
    fastify.log.info(`server listening on ${address}`)
})
