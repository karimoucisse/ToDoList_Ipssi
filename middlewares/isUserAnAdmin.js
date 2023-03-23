const jwt = require("jsonwebtoken");
const User = require("../modeles/User.Schema");
require("dotenv").config();

exports.isUserAnAdmin = async (req, res, next) => {
    try {
        const { isAdmin } = req.user;
        if (isAdmin) {
            next();
        }else {
            throw error
        }
    } catch (error) {
        next("user is not authorized to access this route");
    }
};
