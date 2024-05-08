const express = require("express");
const {
  addTableCtrl,
  getTableCtrl,
} = require("../../controller/tables/tableCtrl");
const isLogin = require("../../middlewares/isLoggedIn");

const tableRoute = express.Router();

tableRoute.post("/", isLogin, addTableCtrl);

tableRoute.get("/", isLogin, getTableCtrl);

module.exports = tableRoute;
