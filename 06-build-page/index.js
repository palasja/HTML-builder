const path = require('path');
const fsPromises = require('fs/promises');

const pathResult = path.join(__dirname, 'project-dist');
const pathTemplate = path.join(__dirname, 'template.html');
const pathComponents = path.join(__dirname, 'components');
const stylesSourse =  path.join(path.join(__dirname, 'styles'));
const stylesResult =  path.join(path.join(pathResult, 'style.css'));
const assetsSourse =  path.join(path.join(__dirname, 'assets'));
const assetsResult =  path.join(path.join(pathResult, 'assets'));
const index = path.join(pathResult, 'index.html');

fsPromises.rm(pathResult, {force : true, recursive: true})
  .then(() => fsPromises.mkdir(pathResult))
  .then(() => fsPromises.readFile(pathTemplate, 'utf8'))
  .then( template => Promise.resolve( template.split('\n')))
  .then(arrTemplate => getConstentOnTemplate(arrTemplate) )
  .then((res) => fsPromises.writeFile(index, res))
  .then(() => fsPromises.readdir(stylesSourse, {withFileTypes: true}))
  .then(dir => Promise.resolve(dir.filter(d => d.isFile() && path.extname(path.join(__dirname, 'styles', d.name)) == '.css')))
  .then(filtredDir => getStyles(filtredDir))
  .then( (data) => fsPromises.writeFile(stylesResult, data))
  .then(() => fsPromises.mkdir(assetsResult))
  .then(()=> copyDir(assetsSourse, assetsResult))
  .catch(err => console.log(err));

function readComponents(s){
  const str = s.trim();
  if(str.slice(0,2) === '{{' && str.slice(-2) === '}}'){
    return fsPromises.readFile(path.join(pathComponents, str.slice(2, str.length-2))+'.html');
  } else{
    return Promise.resolve(str);
  }
}
function getConstentOnTemplate(arrTemplate){
  return arrTemplate.reduce((chain, str) =>  
    chain.then((contents) =>
      readComponents(str)
        .then((data) => contents.concat(data + '\n'))), Promise.resolve(''));
}
function getStyles(filtredDir){
  return filtredDir.reduce((cur, d) => 
    cur.then( (contents) =>
      fsPromises.readFile(path.join(stylesSourse, d.name), 'utf8')
        .then((data) => contents.concat(data))) , Promise.resolve(''));
}
function copyDir(soure, result){
  return fsPromises.readdir(path.join(soure), {withFileTypes: true})
    .then(arrPath => {
      arrPath.reduce((chain, d) => chain.then(
        () => {
          const fullPath = path.join(soure, d.name);
          const copyPath = path.join(result, d.name);
          if(d.isFile()){
            return fsPromises.copyFile(fullPath, copyPath);
          }
          if(d.isDirectory()){
            return fsPromises.mkdir(copyPath)
              .then(() => copyDir(fullPath, copyPath));
          }
        }
      ), Promise.resolve());
    });
}