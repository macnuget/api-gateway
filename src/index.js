require('dotenv').config()
const proxy = require('fastify-http-proxy')
const fastify = require("fastify")({ 
    logger: true,
})

fastify.register(proxy, {
    upstream: process.env.WAREHOUSE_API_URL,
    prefix: '/warehouse'
})
fastify.register(proxy, {
    upstream: process.env.ORDERS_API_URL,
    prefix: '/orders'
})
fastify.register(proxy, {
    upstream: process.env.CUSTOMERS_API_URL,
    prefix: '/customers'
})
fastify.register(proxy, {
    upstream: process.env.PRODUCTS_API_URL,
    prefix: '/products'
})

try {
    fastify.listen(process.env.PORT || 3000)
} 
catch (err) {
    fastify.log.error(err)
    process.exit(1)
}

