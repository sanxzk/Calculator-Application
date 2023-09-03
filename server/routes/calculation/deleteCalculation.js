const Calculation = require("../../Models/CalculationSchema");
const User = require('../../Models/UserSchema.js')

const deleteCalculation = async (req, res) => {
    let errorCode = null;
    try {
        //extracting calculation id
        const calculationId = req.headers.calculationid;

        //finding calculation by id
        const isCalculationExist = await Calculation.findById(calculationId);
        const user = await User.findById(req.user.userId);
        if (!isCalculationExist) {
            errorCode = 404;
            throw new Error("Calculation not found");
        }

        //validating the access of the user
        if (isCalculationExist.owner.toHexString() !== req.user.userId) {
            errorCode = 403;
            throw new Error("Access Denied");
        }

        //removing that calculation
        let filtered_calculations = user.calculations.filter(function (val) { //callback function
            if (val.toHexString() !== calculationId) { //filtering criteria
                return val;
            }
        })
        user.calculations = filtered_calculations;

        //saving user again after removing that calculation
        await user.save();

        //deleting that calculation from database
        Calculation.findByIdAndDelete(calculationId).then(() => {
            res.status(200).json({ success: true, message: "Calculation deleted successfully" })
        }).catch(err => {
            errorCode = 500;
            throw new Error("Calculation deletion failed");
        })


    } catch (err) {
        
        //sending errorcode and erro message if there is any
        res.status(errorCode || 500).json({ success: false, message: "Internal Server error", error: err.message })
    }
}

module.exports = deleteCalculation;