module.exports = async function (fastify, opts) {
    
    const jwt = fastify.jwt
    
    fastify.addHook('preHandler', async (req, res) => {
        let authenticated = false

        try{
            const token = req.headers.authorization.split(' ')[1]
        
            if(jwt.verify(token)) authenticated = true
        }
        catch(err) {

        }

        if(!authenticated) res.status(401).send()
    })
}
