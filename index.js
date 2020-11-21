const fs = require('fs');

const scanFolder = (path, ext) => {
  const files =  fs.readdirSync(path);
  let result = [];

  for (const file of files) {
    const newPath = `${path}/${file}`;

    if (fs.lstatSync(newPath).isFile() && file.endsWith(`.${ext}`)) {
      result.push({fileName: file, content: fs.readFileSync(newPath).toString()})
    } 
    if (fs.lstatSync(newPath).isDirectory()){
      result = [...result, ...scanFolder(newPath, ext)];
    }
  }

  return result;
}

const insertIntoTxt = (files, outputPath) => {
  let str = '';

  for (const file of files) {
    str += `\n ${file.fileName} \n ${file.content} \n`;
  }

  fs.writeFileSync(outputPath, str);
}
  
const startPath = process.argv[2];
const outputPath = process.argv[3];
const extantion = process.argv[4];

let result;
if(!startPath || !outputPath || !extantion) {
  console.log('Not enough params given: 1 - start path, 2 - output path, 3 - extantion');
} else {
  try{
    result = scanFolder(startPath, extantion);
    insertIntoTxt(result, outputPath);
  } catch (error) {
    console.log(error);
  }
}
