const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./database/db");
const path = require("path");
const app = express();

const authController = require("./controllers/authController.js");
const propertyController = require("./controllers/propertyController.js");

dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authController);
app.use("/property", propertyController);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App listening to the port ${PORT}`);
  connectDB();
});
