const { stdin, stdout } = process;
const path = require('path');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface( stdin, stdout );
const file = path.join(__dirname, 'input.txt');
stdout.write('Input text\n');
fs.writeFile(file, '', err => {if (err) throw err})
rl.on('line',data => {
  if(data.toString() === 'exit') {
    rl.close();
    return;
  } 
  fs.appendFile(file, data+'\n', (err) => {
    if (err) throw err;
  });
});
rl.on('close', () => stdout.write('Close input'));
rl.on('SIGINT', function () {
  rl.close();
});