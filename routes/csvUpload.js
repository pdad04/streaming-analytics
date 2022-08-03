const axios = require("axios");
const router = require("express").Router()
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

const upload = multer({storage: storage});



router.post("/netflix", upload.single("csv"), (req, res, next) => {
  res.send('Uploaded');
})

module.exports = router;