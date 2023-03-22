const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        isAdmin: { type: Boolean, require: true, default: false },
        email: { type: String, required: true, unique: true },
        password: { type: String, require: true },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model('User', UserSchema)

module.exports = User
