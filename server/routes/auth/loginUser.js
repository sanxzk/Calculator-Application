const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const User = require('../../Models/UserSchema.js');

const secretKey = process.env.SECRET_KEY;

const loginUser = async (req, res) => {
    let errorCode = null;
    try {
        //sending response of invalid request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }

        //extracting credentials
        let { email, password } = req.body;
        email = email.toLowerCase();

        //finding user
        const isUser = await User.findOne({ email }).select('+password');
        if (isUser) {
            //validating password
            const isMatch = await bcrypt.compare(password, isUser.password);
            if (isMatch) {
                const user = {

                    //making authentication Token
                    userId: isUser._id,
                    name: isUser.name,
                    email: isUser.email

                };
                const authToken = jwt.sign(
                    user,
                    secretKey,
                );
                //sending response
                const loggedInUser = { id: isUser._id, name: isUser.name, email: isUser.email };
                res.status(200).json({ success: true, authToken, loggedInUser });
            } else {
                errorCode = 403;
                throw new Error("Invalid credentials");
            }
        }
        else {
            errorCode = 403;
            throw new Error("Invalid credentials");
        }
    }
    catch (err) {

        //sending errorcode and erro message if there is any
        res.status(errorCode || 500).json({ success: false, message: "Internal Server error", error: err.message });
    }
}

module.exports = loginUser;