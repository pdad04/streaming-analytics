const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json({ extended: false }));

app.use("/api/upload/csv", require("./routes/csvUpload"));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
