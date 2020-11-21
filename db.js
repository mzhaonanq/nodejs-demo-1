const path = require('path')
const fs = require("fs")
const homePath = process.env['HOME']
const dbPath = path.join(homePath, ".todo")
const db = {
    read(path = dbPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, { flag: "a+" }, (error, data) => {
                if (error) { return reject(error) }
                let list
                try {
                    list = JSON.parse(data.toString())
                } catch (err2) {
                    list = []
                }
                resolve(list)

            })
        })
    },
    write(list, path = dbPath) {
        return new Promise((resolve, reject) => {
            let string = JSON.stringify(list)
            fs.writeFile(path, string + '\n', (error) => {
                if (error) { return reject(error) }
                resolve()
            })
        })
    }
}

module.exports = db