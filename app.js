"use strict";
const express = require("express");
const app = express();
const port = 3000;
const ejs = require("ejs");

app.use(express.static(__dirname + "/public"));
require("dotenv").config();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("./index.ejs");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
