const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
const input = fs.ReadStream(filePath, 'utf-8');
input.on('data', chunk => console.log(chunk));