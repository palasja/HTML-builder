const path = require('path');
const fs = require('fs');

fs.mkdir(path.join(__dirname, 'files-copy'), err => {if(err) throw err;});
copyDir('files','files-copy');
clearCopyFolder('files','files-copy');

function copyDir(folder, copyFolder){
  fs.readdir(path.join(__dirname, folder), {withFileTypes: true}, (err, dir) => {
    if (err) {
      throw err;
    }
    dir.forEach( d => {
      const fullPath = path.join(__dirname, folder, d.name);
      const copyPath = path.join(__dirname, copyFolder, d.name);
      if(d.isFile()){
        fs.copyFile(fullPath, copyPath, err => {if(err) throw err;});
      }
      if(d.isDirectory()){
        fs.mkdir(copyPath, err => {if(err) throw err;});
        copyDir(fullPath, copyPath); 
      }
    });
  });
}

function clearCopyFolder(folder, copyFolder){
  fs.readdir(path.join(__dirname, copyFolder), {withFileTypes: true}, (err, dir) => {
    if (err) { throw err;}

    dir.forEach( d => {
      const fullPath = path.join(__dirname, folder, d.name);
      const copyPath = path.join(__dirname, copyFolder, d.name);
      if(d.isFile()){
        fs.access(fullPath, fs.constants.F_OK, (err) => {
          if(err) fs.rm(copyPath, err => {if(err) throw err;});
        });
      }
      if(d.isDirectory()){
        fs.access(fullPath, fs.constants.F_OK, (err) => {
          if(err) fs.rm(copyPath, { recursive: true }, err => {if(err) throw err;});
        });
      }
    });
  });
}