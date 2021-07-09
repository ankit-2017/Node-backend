const User = require("../../../Database/Models/UserModel")
const UserValidator = require("../../../Validators/UserValidator")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userTransformer } = require("../../Transformer/authTransformer")

/**
 * @swagger
 * @description: Register user in database 
 * @paths:
 *      node_backend/Controllers/Api/v1/Authentication
 * @param name string
 * @param email email
 * @param password
 * @param location 
 * @returns json
 */
exports.Register = async (req, res) => {
    try {
        const body = req.body
        const validator = UserValidator.RegistrationValidator()(body)
        if (validator != true) {
            return res.status(400).json(validator); 
        }
        const saltRounds = 12;
        const hash = await bcrypt.hash(body.password, saltRounds)
        body.password = hash
        const result = await new User(body).save()
        return res.status(200).json({data:[result], error: false, message: "User created successfully"})
       
    } catch (error) {
        console.error(error)
        return res.status(500).json({data:[], error: true, message: "Something went wrong"})
        
    }
}

exports.Login = async (req, res) => {
    try {
        const validator = UserValidator.LoginValidator()(req.body)
        if (validator != true) {
            return res.status(400).json(validator); 
        }
        let user = await User.findOne({email: req.body.email})
        //if user not found then create new user 
        if(!user){
            const hash = await bcrypt.hash(req.body.password, 12)
            req.body.password = hash
            const newUser = await new User.create(req.body).save();
            const token = GenerateToken(newUser)
            return res.status(200).json({data:userTransformer(newUser, token), error: false, message: "User registered."})
        }
        //match password
        const matchPassword = await bcrypt.compare(req.body.password, user.password)
        if(!matchPassword) {
            return res.status(422).json({data:[], error: true, message: "Password did not matched"})
        }
        //generate a token with expiration of 24 hours
        const token = GenerateToken(user)

        return res.status(200).json({data: userTransformer(user, token), error: false, message: "Login successfull"})
    } catch (error) {
        return res.status(500).json({data:[error.stack], error: true, message: "Something went wrong"})
    }
}

exports.VerifyToken = async (req, res) => {
    try {
        const {email} = req.decoded.data
        const user = await User.aggregate([
            {$project: {'updatedAt': -1}},
            {$match: {email}}
        ]);
        const token = GenerateToken(user)
        return res.status(200).json({data: userTransformer(user, token), error: false, message: "Token verified."})
    } catch (error) {
        return res.status(500).json({data:[error.stack], error: true, message: "Something went wrong"})
    }
}

const GenerateToken = (payload) =>{
    const token = jwt.sign({
        data: payload,
    }, process.env.JWT_SECRET, {expiresIn: '5d'})
    return token
}