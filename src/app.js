const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db.js");
const routes = require("./routes.js");

const app = express();
const port = 3000;

connectDB();

app.use("/", routes);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));