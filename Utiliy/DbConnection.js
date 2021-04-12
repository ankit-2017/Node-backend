const mongoose = require("mongoose")

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
}
exports.connection = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI, options)
        console.log("Database connected successfully")
    }catch (error) {
        console.log(error)
        throw Error("Unable to connect database. Make sure you have .env setup")
    }
}