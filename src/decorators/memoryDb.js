const users = [{username: 'user', password: 'pass'}]

const getByUsername = async (username) => users.find(x => x.username === username)

module.exports = {
    getByUsername
}
