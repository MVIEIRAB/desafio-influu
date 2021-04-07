const restify = require('restify')

const controller = require('./modules/controller')

const app = restify.createServer()

app.listen(process.env.PORT || 3000)

app.get('/', controller.getUsers)
