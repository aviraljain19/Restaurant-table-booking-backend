require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/connectDB");
const usersRoute = require("./routes/users/usersRoute");
const globalErrHandler = require("./middlewares/globalErrHandler");
const tableRoute = require("./routes/tables/tableRoute");
const reservationRoute = require("./routes/reservations/reservationRoute");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/v1/user", usersRoute);

app.use("/api/v1/tables", tableRoute);

app.use("/api/v1/reservations", reservationRoute);

app.use(globalErrHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
