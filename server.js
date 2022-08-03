const express = require("express");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json({extended: false}));

app.use("/api/csv-upload", require("./routes/csvUpload"));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));