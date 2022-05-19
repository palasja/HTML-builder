const { stdin, stdout } = process;
const path = require('path');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface( stdin, stdout );
stdout.write('Input text\n');

const inputFile = fs.writeFile(path.join(__dirname, 'input.txt'),'',(err) => {
    if (err) throw err;
});
rl.on('line',data => {
    if(data.toString() === 'exit') rl.close();
    fs.appendFile(path.join(__dirname, 'input.txt'), data+'\n', (err) => {
        if (err) throw err;
    })
})
rl.on('close', () => stdout.write('Close input'));
rl.on('SIGINT', function () {
     rl.close();
  });