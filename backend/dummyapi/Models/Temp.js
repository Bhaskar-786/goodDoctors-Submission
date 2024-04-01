const mongoose = require("mongoose");

const tempSchema = new mongoose.Schema({
  num: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Temp", tempSchema);
