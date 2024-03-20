const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db.js");
const routes = require("./routes/routes.js");
const auth = require("./middleware/auth.js");

const app = express();
const port = 4000;

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(auth.initialize());

app.use("/", routes);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
