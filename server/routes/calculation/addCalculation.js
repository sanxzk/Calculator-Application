const Calculation = require("../../Models/CalculationSchema");
const User = require("../../Models/UserSchema");

const addCalculation = async (req, res) => {
    let ErrorCode = null;
    try {
        //extracting the userId
        const userId = req.user.userId;

        //finding user
        const isUserExists = await User.findById(userId);
        if (!isUserExists) {
            ErrorCode = 404;
            throw new Error("No user found")
        }

        //extracting calculation
        const calculation = { expression: req.body.expression, result: req.body.result, owner: isUserExists };44

        //saving new calculation
        const newCalculation = new Calculation(calculation);
        await newCalculation
            .save()
            .then((calc) => {
                isUserExists.calculations.push(calc);
                isUserExists
                    .save()
                    .then(() => {
                        res.status(200).json({ success: true, message: "Calculation Saved Successfully" , savedCalculation:calc});
                    }).catch(err => {
                        throw new Error("Calculation sync with user failed " + err.message);
                    })
            }).catch(err => {
                throw new Error("Caculation saving failed")
            })

    } catch (err) {
        
        //sending errorcode and erro message if there is any
        res.status(ErrorCode || 500).json({ success: false, message: "Internal Server Error", error: err.message })
    }
}

module.exports = addCalculation;