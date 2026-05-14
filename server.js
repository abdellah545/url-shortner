require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const urlRoutes = require("./routes/urlRoutes");

const app = express();

app.use(express.json());

/* ================= DATABASE ================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

/* ================= ROUTES ================= */

app.use(express.static("public"));

/* ================= API ROUTES ================= */
app.use("/", urlRoutes);

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
