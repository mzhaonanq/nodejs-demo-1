const { program } = require('commander');
program.version('0.0.1');
const api = require("./index")

program
    .command('add <task>')
    .description('add task')
    .action((task) => {
        api.add(task)
    });


program.parse(process.argv);
