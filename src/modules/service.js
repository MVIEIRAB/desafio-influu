const axios = require('axios')
const fs = require('fs')

const urlToImage = require('url-to-image')
const stringify = require('csv-stringify')

class ListService {
    async getUsers() {
        try {
            const { data } = await axios.get('https://reqres.in/api/users?per_page=12')
            this._generateImages(data) // images generate
            this._generateCSV(data) // csv generate
            return data
        } catch (error) {
            console.error(error)
        }
    }
    _generateImages({ data }) {
        for (const user of data) {
            urlToImage(user.avatar, `./src/images/${user.id}-${user.first_name}.jpg`, { width: 128, height: 85 })
        }
    }
    _generateCSV(data) {
        const content = this._normalize(data)
        const columns = {
            id: 'id',
            email: 'name',
            full_name: 'full name',
            avatar: 'avatar'
        }
        stringify(content, { header: true, columns: columns }, (err, output) => {
            if (err) throw err
            fs.writeFile('./src/infraestructure/users.csv', output, (err) => {
                if (err) throw err
                console.log('Pronto...')
            })
        })
    }
    _normalize({ data }, content = []) {
        for (let i = 0; i < data.length; i++) {
            content.push([
                data[i].id,
                data[i].email,
                `${data[i].first_name} ${data[i].last_name}`,
                `${data[i].first_name}-image.jpg`
            ])
        }
        return content
    }
}

module.exports = new ListService