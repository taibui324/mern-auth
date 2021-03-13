require('dotenv').config()

const express =require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')


const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    temp: true
}))

//connect to routes 

app.use('/user', require('./routes/userRoutes'))

//connect url mongoose 
const URI = process.env.MONGODB_URL
mongoose.connect(
    URI, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err => {
        if(err) throw err;
        console.log("Mongo database is connected")
    }
)



const PORT = process.env.PORT || 5000
app.listen( PORT, () => {
    console.log('server is running on port' , PORT)
})