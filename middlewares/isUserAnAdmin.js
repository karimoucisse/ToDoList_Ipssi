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
        next("only an admin is authorized to access this route");
    }
};
