const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mahasiswaRoutes = require("./routes/mahasiswa");
const authRoutes = require("./routes/auth");
require("dotenv/config");

// middleware
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Selamat Datang Di Rest Api Sederhana Frans Bachtiar");
});

app.use(bodyParser.json());
app.use("/mahasiswa", mahasiswaRoutes);
app.use("/auth", authRoutes);

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let db = mongoose.connection;

// handle error
db.on(
  "error",
  console.error.bind(console, "Error Establishing a Database Connection?")
);
// handle success
db.once("open", () => {
  console.log("Database is connected");
});

app.listen(process.env.PORT, () => {
  console.log(`Server Running On ${process.env.PORT}`);
});
