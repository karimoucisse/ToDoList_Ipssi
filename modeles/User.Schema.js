const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    isAdmin: { type: Boolean, require: true, default: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, require: true },
    lists: [{ type: Schema.Types.ObjectId, ref: "List" }],
  },
  {
    timestamps: true,
  }
);

const User = model("User", UserSchema);

module.exports = User;
