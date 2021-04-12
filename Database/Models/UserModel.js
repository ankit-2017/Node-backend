const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name : String,
    email: String,
    location: String,
    password: String,
    employed: Boolean
}, {
    timestamps : true
})

 module.exports =  mongoose.model("User", UserSchema)


