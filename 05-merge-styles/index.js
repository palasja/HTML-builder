const path = require('path');
const fsPromises = require('fs/promises');

const result =  path.join(path.join(__dirname, 'project-dist', 'bundle.css'));
fsPromises.readdir(path.join(__dirname, 'styles'), {withFileTypes: true})
  .then(dir => Promise.resolve(dir.filter(d => d.isFile() && path.extname(path.join(__dirname, 'styles', d.name)) == '.css')))
  .then(filtredDir => filtredDir.reduce((cur, d) => 
    cur.then( (contents) =>
      fsPromises.readFile(path.join(__dirname, 'styles', d.name), 'utf8')
        .then((data) => contents.concat(data))) , Promise.resolve('')))
  .then( (data) => fsPromises.writeFile(result, data))
  .catch(err => console.log(err));