require('dotenv').config()
const express = require('express')
const cors = require('cors')
// const PORT = process.env.PORT || 3001
const PORT = 3001

const app = express()
const index = require('./routes/index')

app.use(express.json())

app.use('/',index)
app.listen(PORT, () => {
    console.log('server start on port', PORT)
})
