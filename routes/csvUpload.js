const axios = require("axios");
const router = require("express").Router()
const netflixUpload = require("../controllers/netflix-controller");
const util = require("util");
const multer = require("multer");
const { nextTick } = require("process");
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "tmp/uploads");
  },
  filename: function(req, file, cb){
    const uniquePrefix = Date.now();
    cb(null, `${uniquePrefix}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => checkFileType(file,cb)  
});

const checkFileType = (file, cb) => {
  file.mimetype === "text/csv" ? cb(null,true) : cb(new Error(),false);
}



router.post("/netflix", upload.single("csv"), async (req, res) => {
  const uploadedFileName = req.file.filename;
  try {
    const fileProcessed = await netflixUpload(uploadedFileName);
    res.status(200).json(fileProcessed);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

module.exports = router;