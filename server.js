// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8001;
const ENV = process.env.ENV || "final";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(cors());
// app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded",
  })
);
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const volunteersRoutes = require("./routes/volunteers");
const servicesRoutes = require("./routes/services");
const line_itemsRoutes = require("./routes/line_items");
const categoriesRoutes = require("./routes/categories");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/volunteers", volunteersRoutes(db));
app.use("/api/services", servicesRoutes(db));
app.use("/api/line_items", line_itemsRoutes(db));
app.use("/api/categories", categoriesRoutes(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/with-cors", cors(), (req, res, next) => {
  res.json({ msg: "WHOAH with CORS it works! 🔝 🎉" });
});

app
  .listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  })
  .on("error", function (err) {
    console.log(err);
  });
