const User = require('../../Models/UserSchema.js')

const getUser = async (req, res) => {
    let errorCode = null;
    try {
        //extracting userId
        const userId = req.user.userId;
        //finding user
        const isUserExists = await User.findById(userId);
        if (!isUserExists) {
            errorCode = 404;
            throw new Error("User not found");
        }
        //sending user as response
        res.status(200).json({ success: true, user: isUserExists });
    } catch (err) {
        
        //sending errorcode and erro message if there is any
        res.status(errorCode || 500).json({ success: false, message: "Internal Server Error", error: err.message })
    }
}

module.exports = getUser;