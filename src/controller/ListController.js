const axios = require('axios')
const fs = require('fs')

const urlToImage = require('url-to-image')

const stringify = require('csv-stringify')

const imageOptions = require('../config/ImageOptions')

class ListarController {
    async gerarCsv(req, res) {
        try {
            const { data } = await axios.get('https://reqres.in/api/users?per_page=12')

            const content = []
            const columns = {
                id: 'id',
                email: 'name',
                full_name: 'full name',
                avatar: 'avatar'
            }

            for (let i = 0; i < data.data.length; i++) {
                urlToImage(data.data[i].avatar, `./images/${data.data[i].first_name}.jpg`, imageOptions)
                const users = [
                    data.data[i].id,
                    data.data[i].email,
                    `${data.data[i].first_name} ${data.data[i].last_name}`,
                    `${data.data[i].first_name}-image.jpg`
                ]
                content.push(users)
            }

            stringify(content, { header: true, columns: columns }, (err, output) => {
                if (err) throw err
                fs.writeFile('users.csv', output, (err) => {
                    if (err) throw err
                    console.log('Pronto...')
                })
            })

            res.send(200, data.data)

        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = new ListarController