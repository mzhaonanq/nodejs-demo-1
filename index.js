const homePath = process.env['HOME']
const path = require('path')
const fs = require("fs")
module.exports.add = (title) => {
    fs.readFile(path.join(homePath, ".todo"), { flag: "a+" }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let list
            try {
                list = JSON.parse(data.toString())
            } catch (err2) {
                list = []
            }
            console.log(data.toString())//字符串类型的数组
            console.log(list)//js数组
            const task = {
                title: title,
                done: false
            }
            list.push(task)
            console.log(list)//添加新任务后的新数组
            let jsonString = JSON.stringify(list)
            fs.writeFile(path.join(homePath, ".todo"), jsonString + '\n', (err3) => {
                if (err2) {
                    console.log(err3)
                }
            })
        }
    })
}