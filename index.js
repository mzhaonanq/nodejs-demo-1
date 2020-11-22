const db = require("./db")
const inquirer = require('inquirer');

module.exports.add = async (title, path) => {
    const list = await db.read(path)
    list.push({ title, done: false })
    await db.write(list, path)
}

module.exports.clear = async () => {
    await db.write([])
}

module.exports.showAll = async () => {
    let list = await db.read()
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'index',
                message: '请选择任务',
                choices: [{ name: "退出", value: "-1" }, { name: "创建任务", value: "-2" },
                ...list.map((task, index) => {
                    return { name: `${task.done ? '[x]' : '[_]'} ${index + 1} - ${task.title}`, value: index.toString() }
                })]
            })
        .then((answer) => {
            const index = parseInt(answer.index)
            if (index >= 0) {
                inquirer.prompt({
                    type: 'list',
                    name: 'action',
                    message: '请选择操作',
                    choices: [
                        { name: '退出', value: 'quit' },
                        { name: '删除', value: 'remove' },
                        { name: '已完成', value: 'done' },
                        { name: '未完成', value: 'unDone' },
                        { name: '修改任务名', value: 'updateTitle' },
                    ]
                }).then((answer2) => {
                    switch (answer2.action) {
                        case 'remove':
                            list.splice(index, 1)
                            db.write(list)
                            break;
                        case 'updateTitle':
                            inquirer.prompt({
                                type: 'input',
                                name: 'title',
                                message: '新的标题',
                                default: list[index].title
                            }).then(answer3 => {
                                list[index].title = answer3.title
                                db.write(list)
                            })
                            break;
                        case 'done':
                            list[index].done = true
                            db.write(list)
                            break;
                        case 'unDone':
                            list[index].done = false
                            db.write(list)
                            break;
                    }
                })
            }
            else if (index === -2) {
                inquirer.prompt({
                    type: 'input',
                    name: 'title',
                    message: '创建任务的标题',
                }).then(answer4 => {
                    list.push({ title: answer4.title, done: false })
                    db.write(list)
                })

            }
        });
}
