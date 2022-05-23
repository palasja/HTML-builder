const path = require('path');
const fs = require('fs');
const {stdout} = process;
printFileInfo('secret-folder');

function printFileInfo(folder){
  fs.readdir(path.join(__dirname, folder), {withFileTypes: true}, (err, dir) => {
    if (err) {
      throw err;
    }
    dir.forEach( d => {
      if(d.isFile()){
        const fullPath = path.join(__dirname, folder, d.name);
        fs.stat(fullPath, (err, stat) => {
          if(err) throw err;
          const size = stat.size;
          const ext = path.extname(path.join(__dirname, folder, d.name));
          const basename = path.basename(path.join(__dirname, folder, d.name), ext);
          stdout.write(`${basename} - ${ext.slice(1)} - ${size} \n`);
        });
      }
    });
  });
}