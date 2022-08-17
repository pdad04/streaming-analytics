const dataForge = require("data-forge");
require("data-forge-fs");
const fs = require("fs");


const netflixUpload = async (file, res, next) => {
  const filePath = `tmp/uploads/${file}`; 
  const dataFrame = await dataForge.readFile(filePath).parseCSV();
  
  const requiredColumns = ["Profile Name", "Start Time", "Duration", "Title"];

  if(requiredColumns.every(el => dataFrame.getColumnNames().includes(el))){
    console.log('YAY');
  }else{
    console.log('Missing column');
    fs.unlinkSync(filePath);
  }


  const fileStats = [1];
  const missingColumns = "";

  if(!fileStats.length){
    throw new Error(`The file is missing columns ${missingColumns}`);
  }
  return fileStats;
}

module.exports = netflixUpload;