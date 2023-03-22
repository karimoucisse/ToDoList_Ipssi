const mongoose = require('mongoose')

const TodoSchema = mongoose.Schema(
    {
        status: {},
        description: {type: String, required: true}
    },
    {
        timestamps: true,
    }
)

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo
