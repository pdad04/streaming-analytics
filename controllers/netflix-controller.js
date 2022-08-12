const dataForge = require("data-forge");
require("data-forge-fs");

const netflixUpload = (req, res, next) => {
  const fileStats = [];
  const missingColumns = "";

  if(!fileStats.length){
    throw new Error(`The file is missing columns ${missingColumns}`);
  }
  return fileStats;
}

module.exports = netflixUpload;