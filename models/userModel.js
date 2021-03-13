const mongoose = require('mongoose')


// setting up schema for user 
const userSchema = new mongoose.Schema({

    
    name:{
        type:String,
        require: [true, "Enter your name"],
        trim: true
    },
    email:{
        type:String,
        require: [true, "Enter your email"],
        trim: true,
        unique: true
    },

    role:{
       type: Number,
       default: 0 // 0 = user , 1 = user admin
    },
    avatar:{
        type:String,
        default: "https://res.cloudinary.com/dl1js6zhs/image/upload/v1615643583/sample.jpg"
    }
},{
        timestamps: true

})

module.exports = mongoose.model("User", userSchema);