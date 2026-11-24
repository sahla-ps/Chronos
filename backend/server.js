const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')


const app = express()

//DB 
connectDB()

//middleware 

app.use(cors())
app.use(express.json())

//test api

app.get('/', (req,res) => {
    console.log("Chronos backend")
})

//start server

const PORT = process.env.PORT || 5000

app.listen(PORT,() => {
    console.log(`server running on port ${PORT}`)
})