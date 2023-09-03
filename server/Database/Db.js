const mongoose = require('mongoose')

const URI = process.env.MONGO_URI;

const ConnectToMongodb = () => {
    try {
        mongoose.connect(URI).then(() => {
            console.log("Database connected successfully");
        })
            .catch(err => {
                console.log({ error: err.message })
            })
    } catch (err) {
        console.log({ error: err.message })
    }
}

module.exports = ConnectToMongodb