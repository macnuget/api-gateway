require('dotenv').config()

const path = require('path')

const fastify = require("fastify")({ 
    logger: true,
})

fastify.register(require('fastify-autoload'), {
    dir: path.join(__dirname, 'routes'),
    dirNameRoutePrefix: false
})

try {
    fastify.listen(process.env.PORT || 3000)
} 
catch (err) {
    fastify.log.error(err)
    process.exit(1)
}

