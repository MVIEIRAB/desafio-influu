const Service = require('./service')

class ListController {
    async getUsers(req, res) {
        const { data } = await Service.getUsers()
        res.send(200, data)
    }
}

module.exports = new ListController