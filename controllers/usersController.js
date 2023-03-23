const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dataController = require("../controllers/dataController");

exports.createUser = async (schema, data) => {
    try {
        const isDataValide = dataController.verifySchemafields();
        if (!isDataValide) {
            return { status: 422, message: "need 2 keys : email, password" };
        }
        const { password, email } = data;
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return { status: 409, message: "email already used" };
        }
        const saltedRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltedRounds);
        const response = await schema.create({ email, password: hashedPassword });
        return { status: 201, message: response };
        // return response;
    } catch (error) {
        console.error(error);
        return { status: 500 };
    }
};

exports.handleUserAuthentication = async (schema, data) => {
    const { password, email } = data;
    const foundUser = await schema.findOne({ email });
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
};
