const mongoose = require("mongoose");

const ListSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model("List", ListSchema);

module.exports = List;
