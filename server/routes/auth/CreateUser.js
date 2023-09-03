const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator')
const User = require("../../Models/UserSchema.js");

const secretKey = process.env.SECRET_KEY;

const createUser = async (req, res) => {
    let errorCode = null;
    try {
        //sending response of invalid request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }

        //extracting credentials
        let { name, email, password } = req.body;
        email = email.toLowerCase();
        const ifUserExist = await User.find({ email });

        //checking is user exists or not
        if (ifUserExist.length) {
            errorCode = 409
            throw new Error("An User already exists with the same email")
        }

        //hashing the password
        const secPass = bcrypt.hashSync(password, 10);
        const newUser = new User({
            name,
            email,
            password: secPass,
        });

        //saving new user
        await newUser.save().then((newUser) => {
            const user = {
                userId: newUser._id,
                email: newUser.email
            }
            const authToken = jwt.sign(user, secretKey);
            res.status(200).json({ success: true, authToken })
        }).catch((err) => {
            errorCode = 500;
            throw new Error(err.message)
        })

    } catch (err) {
        //sending errorcode and erro message if there is any
        res.status(errorCode || 500).json({ success: false, message: "Internal server error", error: err.message });

    }
}

module.exports = createUser;