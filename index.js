const db = require("./db")

module.exports.add = async (title, path) => {
    const list = await db.read(path)
    list.push({ title, done: false })
    await db.write(list, path)
}

module.exports.clear = async () => {
    await db.write([])
}

