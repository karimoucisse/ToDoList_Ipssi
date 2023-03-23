const { Schema, model } = require("mongoose");

const ListSchema = Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const List = model("List", ListSchema);

module.exports = List;
