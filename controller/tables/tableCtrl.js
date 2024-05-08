const Table = require("../../model/Table");

const addTableCtrl = async (req, res) => {
  const { tableNumber, capacity } = req.body;

  try {
    const newTable = new Table({ tableNumber, capacity });
    await newTable.save();
    res.json(newTable);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getTableCtrl = async (req, res) => {
  try {
    const tables = await Table.find();
    res.status(200).json({ status: "success", data: tables });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { addTableCtrl, getTableCtrl };
