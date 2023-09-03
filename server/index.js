require('dotenv').config()
const cors = require('cors')
const express = require('express');
const ConnectToMongodb = require('./Database/Db');

const app = express();
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 5000;

ConnectToMongodb()


app.use('/api/auth', require('./routes/auth'))
app.use('/api/calculation',require('./routes/Calculation'))
app.use('/', (req, res) => {
    res.json({ success: true, path: "/" })
})

app.listen(PORT, () => {
    try {
        console.log(`Backend listening on http://localhost:${PORT}`);
    } catch (err) {
        console.log({ error: err.message });
    }
})
