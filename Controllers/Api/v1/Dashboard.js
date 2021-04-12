const User = require("../../../Database/Models/UserModel")
const { userTransformer } = require("../../Transformer/authTransformer")
const UserValidator = require("../../../Validators/UserValidator")



exports.Profile = async (req, res) => {
    try {
        console.log(req.query)
        if(!req.query.id) {
            return res.status(400).json({error: true, message: "Id field is required"})
        }
        const result = await User.findOne({_id: req.query.id})
        return res.status(200).json({data: userTransformer(result, ""), error: false, message: "Profile fetched successfully"})  
       
    } catch (error) {
        return res.status(500).json({data:[error.message], error: true, message: "Something went wrong"})
        
    }
}