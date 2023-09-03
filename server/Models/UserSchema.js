const mongoose = require('mongoose')
const Calculation = require('./CalculationSchema.js')



const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        select: false
    },
    calculations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'calculation'
    }]
},{
    timestamps:{
        createdAt:"created at",
        updatedAt:"modified at"
    }
})

module.exports = User = mongoose.model('User', UserSchema)