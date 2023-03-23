const jwt = require("jsonwebtoken");
const User = require("../modeles/User.Schema");
require("dotenv").config();

exports.isUserConnected = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const { userId, email, isAdmin } = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = {
            userId,
            email,
            isAdmin
        };
        next();
    } catch (error) {
        next("token is not valid");
    }
};
