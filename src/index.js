const restify = require('restify')

const ListarController = require('./controller/ListController')

const app = restify.createServer()

app.listen(3000)

app.get('/', ListarController.gerarCsv)