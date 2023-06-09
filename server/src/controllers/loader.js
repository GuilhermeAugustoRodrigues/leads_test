"use strict";
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

const files = fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  );
});

const controllers = {};

files.forEach((file) => {
  const fileName = path.parse(file).name;
  const controller = require(path.join(__dirname, file));
  controllers[fileName] = controller;
});

module.exports = controllers;
