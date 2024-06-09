const express = require("express");
const cors = require("cors");
const fs = require("fs");

const PORT = process.env.PORT || 5000;
const app = express();

if (!fs.existsSync("./tmp/upload")) {
  fs.mkdirSync("./tmp/upload", { recursive: true });
}
app.use(cors());
app.use(express.json({ extended: false }));

app.use("/api/upload/csv", require("./routes/csvUpload"));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
