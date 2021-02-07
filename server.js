// load .env data into process.env
require('dotenv').config();

// web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');

/* old way of connecting to PG db from server.js file before modularizing this process
 * PG database client/connection setup
 * const { Pool } = require('pg');
 * const dbParams = require('./lib/db.js');
 * const db = new Pool(dbParams);
 * db.connect();
 * Load the logger first so all (static) HTTP requests are logged to STDOUT
 * 'dev' = Concise output colored by response status for development use.
 * The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes. */
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

/* separated Routes for each Resource
 * note: Feel free to replace the example routes below with your own */
const createPasswordRoutes = require("./routes/password_gen");
const loginRoute = require("./routes/login");
const indexRoute = require("./routes/index");

/* GET & POST requests here 
 * Mount all resource routes
 * Note: Feel free to replace the example routes below with your own
 * Home page */
app.use("/", indexRoute);
app.use("/password_gen", createPasswordRoutes);
app.use("/login", loginRoute);

// app listener
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});