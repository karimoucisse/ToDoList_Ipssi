const { Schema, model } = require("mongoose");

const ListSchema = Schema(
  {
    name: { type: String, require: true },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    todos: { type: Schema.Types.ObjectId, ref: "Todo" },
  },
  {
    timestamps: true,
  }
);

const List = model("List", ListSchema);

module.exports = List;
