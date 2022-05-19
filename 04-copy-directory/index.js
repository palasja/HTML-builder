const path = require('path');
const fs = require('fs');
const readdir = require('fs/promises');
const {stdout} = process;
await fs.rm(path.join(__dirname, 'files-copy'), { recursive: true }, err => {});
fs.mkdir(path.join(__dirname, 'files-copy'), err => {});
copyDir('files','files-copy');

function copyDir(folder, copyFolder){
    fs.readdir(path.join(__dirname, folder), {withFileTypes: true}, (err, dir) => {
        if (err) {
            throw err;
        }
        dir.forEach( d => {
            if(d.isFile()){
                const fullPath = path.join(__dirname, folder, d.name);
                const copyPath = path.join(__dirname, copyFolder, d.name);
                fs.copyFile(fullPath, copyPath, err => {})
            }
            if(d.isDirectory()){
                const fullPath = path.join(__dirname, folder, d.name);
                const copyPath = path.join(__dirname, copyFolder, d.name);
                fs.mkdir(copyPath, err => {});
                copyDir(fullPath, copyPath); 
            }
        });
    });
}
