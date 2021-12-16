const loginValidator = {
    schema: {
        body: {
            type: 'object',
            required: ['username', 'password'],
            properties: {
                username: { type: 'string' },
                password: { type: 'string' }
            }
        }
    },
    response: {
        '2xx': {
            type: 'object',
            properties: {
                access_token: { type: 'string' }
            }
        }
    }
}

const verifyValidator = {
    schema: {
        headers: {
            type: 'object',
            required: ['authorization'],
            properties: {
                authorization: { type: 'string' }
            }
        }
    }
}

module.exports = async function (fastify, opts) {

    const users = fastify.db
    const jwt = fastify.jwt

    fastify.post('/login', loginValidator, async (req, res) => {
        const user = await users.getByUsername(req.body.username)
        if (!user) return res.status(401).send()

        if(user.password !== req.body.password) return res.status(401).send()

        const access_token = jwt.create({ username: user.username})

        return { access_token }
    })

    fastify.post('/verify', verifyValidator, (req, res) => {
        const token = req.headers.authorization.split(' ')[1]
        
        if(!jwt.verify(token)) return res.status(401).send()

        return res.status(200).send()
    })
}
