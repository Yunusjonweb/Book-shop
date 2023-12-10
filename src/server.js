const express = require("express");
const fs = require("fs");
const path = require("path");
const CookieParser = require("cookie-parser");
const morgan = require("morgan");

const { PORT } = require("../config");

const app = express();

app.listen(PORT, (_) => {
  console.log(`SERVER READY AT http://localhost:${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(CookieParser());
app.use(morgan("tiny"));

// Routes
fs.readdir(path.join(__dirname, "routes"), (err, data) => {
  if (!err) {
    data.forEach((file) => {
      let routePath = path.join(__dirname, "routes", file);
      const Route = require(routePath);

      if (Route.path && Route.router) {
        app.use(Route.path, Route.router);
      }
    });
  }
});

// API => Aplication Programming Languages
// RESFULL API => JSON

// Project Api => Documentation
// GET /books => hamma kitobni jsonda chiqaradi === Done
// GET /book/slugify => 1-kitobni chiqaradi === Done
// POST /books => kitobni malumotlar bazaga saqlanadi === Done
// PATCH /book/1 => 1-kitobni malumotlarni o'zgartiradi === Done
// DELETE /book/1 => 1-kitobni malumotlarni o'chiradi === Done
