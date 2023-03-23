const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../modeles/User.Schema");
const userController = require("../controllers/usersController");

router.post("/signup", async (req, res, next) => {
    try {
        const response = await userController.createUser(User, req.body);
        const createdUser = response?.body;
        res.status(response.status).json({ message: response.message });
    } catch (error) {
        next(error);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const { password, email } = req.body;
        const foundUser = await User.findOne({ email });
        const dataToSend = {
            userId: foundUser._id.toString(),
            token: jwt.sign(
                {
                    isAdmin: foundUser.isAdmin,
                    userId: foundUser._id.toString(),
                    email: foundUser.email,
                },
                process.env.SECRET_TOKEN,
                {
                    expiresIn: "10h",
                }
            ),
        };
        res.status(200).json(dataToSend);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
