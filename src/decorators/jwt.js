const jwt = require('jsonwebtoken')
const jwt_secret = process.env.JWT_SECRET

const verify = (token) => {
    try {
        jwt.verify(token, jwt_secret)
        return true
    }
    catch (err) {
        return false
    }
}

const create = (data) => {
    return jwt.sign(data, jwt_secret, { expiresIn: '1d' })
}

module.exports = {
    verify,
    create
}
