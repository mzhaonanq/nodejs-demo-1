const { program } = require('commander');
program.version('0.0.1');

program
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --pizza-size <size>', 'size of pizza')//small,medium,large
    .option('-t, --pizza-type <type>', 'flavour of pizza');//sausage,onion, mushrooms,curry,cheese

program.parse(process.argv);

if (program.debug) console.log(program.opts());
console.log('pizza details:');
if (program.pizzaSize) console.log(`- ${program.pizzaSize}`);
if (program.pizzaType) console.log(`- ${program.pizzaType}`);
