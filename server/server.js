require("dotenv").config();
const PORT = process.env.APP_PORT || 8080;

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookie_parser = require("cookie-parser");
const app = express();

app.use(express());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan("tiny"));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookie_parser());

// DB connection
require("./config/db_connection");

// Routes declaration
app.use(require("./routes"));

app.listen(PORT, () => {
  console.log("Server running on port : ", PORT);
});
