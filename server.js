const express = require("express");
const cors = require("cors");
const fs = require("fs");

const PORT = process.env.PORT || 5000;
const app = express();

if (!fs.existsSync("./tmp/uploads")) {
  fs.mkdirSync("./tmp/uploads", { recursive: true });
}

if (fs.existsSync("./tmp/uploads")) {
  console.log("tmp/uploads exists!");
}
app.use(cors());
app.use(express.json({ extended: false }));

app.use("/api/upload/csv", require("./routes/csvUpload"));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
