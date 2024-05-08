const Reservation = require("../model/Reservation");

const isTableAvailable = async (tableId, date, startTime, endTime) => {
  try {
    console.log("adasdasd");
    console.log(tableId, date + "T00:00:00.000Z", startTime, endTime);
    const tableFound = await Reservation.findOne({ tableId });
    console.log(tableFound);
    if (date == tableFound.date + "T00:00:00.000Z") {
      console.log("inside if");
      if (startTime === tableFound.startTime) {
        return false;
      } else if (
        startTime > tableFound.startTime &&
        startTime < tableFound.endTime
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      console.log("not inside if");
      return true;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error checking table availability");
  }
};

module.exports = isTableAvailable;
