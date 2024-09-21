const mongoose = require("mongoose");

// create schema
const  userModel = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    age:{
        type:Number,
    },
},{ timestamps: true })

// create Model

const User = mongoose.model('User',userModel)

module.exports = User