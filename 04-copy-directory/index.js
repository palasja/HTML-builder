const path = require('path');
const fs = require('fs');
fs.rm(path.join(__dirname, 'files-copy'), {force : true, recursive: true}, err => {
    if(err) throw err;
    fs.mkdir(path.join(__dirname, 'files-copy'), err => {
        if(err) throw err;
        fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true}, (err, dir) => {
            if (err) {
              throw err;
            }
            dir.forEach( d => {
              const fullPath = path.join(__dirname, 'files', d.name);
              const copyPath = path.join(__dirname, 'files-copy', d.name);
              if(d.isFile()){
                fs.copyFile(fullPath, copyPath, err => {if(err) throw err;});
              }
            });
          });
    });
});