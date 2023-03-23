const { Schema, model } = require("mongoose");

const TodoSchema = new Schema(
    {
        status: { type: String, required: true, enum: ['à faire', 'en cours', "terminer"]},
        description: { type: String, required: true },
        listId: { type: Schema.Types.ObjectId, ref: "List", required: true },
    },
    {
        timestamps: true,
    }
);

const Todo = model("Todo", TodoSchema);

module.exports = Todo;
