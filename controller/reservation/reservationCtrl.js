const Reservation = require("../../model/Reservation");
const Table = require("../../model/Table");
const User = require("../../model/User");
const isTableAvailable = require("../../utils/isAvailable");

const addReservationCtrl = async (req, res) => {
  const { tableId, date, startTime, endTime } = req.body;
  const userId = req.user;
  let availability = true;
  const tableFound = await Reservation.findOne({ tableId });
  let convertedDate = new Date(date);
  convertedDate.setDate(convertedDate.getUTCDate());
  convertedDate = new Date(convertedDate.setHours(5, 30, 0, 999));
  if (convertedDate.toString() === tableFound?.date.toString()) {
    console.log("inside if");
    if (startTime === tableFound.startTime) {
      availability = false;
    } else if (
      startTime > tableFound.startTime &&
      startTime < tableFound.endTime
    ) {
      availability = false;
    } else {
      availability = true;
    }
  } else {
    console.log("not inside if");
    availability = true;
  }

  // const availability = await isTableAvailable(
  //   tableId,
  //   date,
  //   startTime,
  //   endTime
  // );
  console.log(availability);
  try {
    if (availability) {
      const newReservation = new Reservation({
        userId,
        date,
        tableId,
        startTime,
        endTime,
      });
      await newReservation.save();
      res.status(200).json({ status: "success", data: newReservation });
    } else {
      res.json("Not available");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getReservationCtrl = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("userId")
      .populate("tableId");
    res.json(reservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { addReservationCtrl, getReservationCtrl };
