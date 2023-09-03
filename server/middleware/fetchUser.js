const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const fetchUser = async (req, res, next) => {
    let errorCode = null;
    try {
        const authToken = req.headers.authtoken;
        if (!authToken) {
            errorCode = 403;
            throw new Error("Access Denied")
        }
        const user = await jwt.verify(authToken, secretKey);
        if (!user) {
            errorCode = 403;
            throw new Error("Access Denied")
        }
        req.user = user;
        next();
    }
    catch (err) {
        res.status(errorCode || 500).json({ success: false, message: "Internal Server Error", error: err.message })
    }
}

module.exports = fetchUser;