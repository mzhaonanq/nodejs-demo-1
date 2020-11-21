const { program } = require('commander');
program.version('0.0.1');



program
    .command('print <content> [destination]')
    .description('print string')
    .action((content, destination) => {
        console.log(content);
    });

program
    .command('say')
    .description('say something')
    .action((...content) => {
        const words = content.slice(1)[0].join(" ")
        console.log(words);
    });

program.parse(process.argv);