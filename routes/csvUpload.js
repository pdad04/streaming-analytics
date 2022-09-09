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
  file.mimetype === "text/csv" ? cb(null,true) : cb(new Error(),false);
}



router.post("/netflix", async (req, res) => {
  upload(req, res, async(err) => {
    if(err){
      res.status(415).json({msg:"File type not supported. Please upload a CSV file"});
    }

    try {
      const {filename:fileName} = req.file;
      const {timezone:timeZone} = req.body
      const fileProcessed = await netflixUpload(fileName, timeZone);
      res.status(200).json(fileProcessed);
    } catch (error) {
      res.status(400).json({msg: error.message});
    }
  })
})

module.exports = router;