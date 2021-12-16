module.exports = async function (fastify, opts) {
    fastify.register(require('fastify-http-proxy'), { 
        upstream: process.env.CUSTOMERS_API_URL 
    })
}

module.exports.autoPrefix = '/customers'
