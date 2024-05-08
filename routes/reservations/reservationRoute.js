const express = require("express");
const {
  addReservationCtrl,
  getReservationCtrl,
} = require("../../controller/reservation/reservationCtrl");
const isLogin = require("../../middlewares/isLoggedIn");

const reservationRoute = express.Router();

reservationRoute.post("/", isLogin, addReservationCtrl);

reservationRoute.get("/", isLogin, getReservationCtrl);

module.exports = reservationRoute;
