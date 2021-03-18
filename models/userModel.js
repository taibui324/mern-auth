const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Enter your email!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Enter your password!"]
    },
    role: {
        type: Number,
        default: 0 // 0 = user, 1 = admin
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dl1js6zhs/image/upload/v1615643583/sample.jpg"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)