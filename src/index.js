require('dotenv').config()

const path = require('path')

const fastify = require("fastify")({ 
    logger: true,
})

fastify.decorate('db', require('./decorators/memoryDb'))
fastify.decorate('jwt', require('./decorators/jwt'))

fastify.register(require('./auth'), { prefix: 'auth' })

fastify.register(require('fastify-autoload'), {
    dir: path.join(__dirname, 'routes'),
    dirNameRoutePrefix: false,
    autoHooks: true,
    cascadeHookds: true,
    overwriteHooks: true
})

try {
    fastify.listen(process.env.PORT || 3000)
} 
catch (err) {
    fastify.log.error(err)
    process.exit(1)
}

