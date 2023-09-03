const mongoose = require('mongoose')

const CalculationSchema = new mongoose.Schema({
    expression: {
        type: String,
    },
    result: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: {
        createdAt: "created at",
        updatedAt: "modified at"
    }
})

module.exports = Calculation = mongoose.model('Calculation', CalculationSchema);
// module.exports = CalculationSchema;