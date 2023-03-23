const { Schema, model } = require("mongoose");

const TodoSchema = Schema(
  {
    status: { type: String, required: true },
    description: { type: String, required: true },
    list: [{ type: Schema.Types.ObjectId, ref: "List", required: true }],
  },
  {
    timestamps: true,
  }
);

const Todo = model("Todo", TodoSchema);

module.exports = Todo;
