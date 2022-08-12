const axios = require("axios");
const router = require("express").Router()
const netflixUpload = require("../controllers/netflix-controller");
const multer = require("multer");
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
}).single("csv");

const checkFileType = (file, cb) => {
  file.mimetype === "text/csv" ? cb(null,true) : cb(new Error("Unsupported file type"),false);
}



router.post("/netflix", (req, res, next) => {
 upload(req, res, async (err) => {
    if(err){
      res.status(415).json({msg: "Only CSV file types are allowed."});
    }

    try {
      const fileProcessed = await netflixUpload(req);
      res.status(200).json(fileProcessed);
    } catch (error) {
      res.status(500).send(error.message);
    }
    
  })
})

module.exports = router;