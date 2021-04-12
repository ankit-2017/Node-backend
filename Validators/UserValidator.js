const Validator = require("fastest-validator")
const v = new Validator()


exports.RegistrationValidator = () => {
    const schema = {
        name : {
            type: "string", min: 3, max: 100
        },
        email: "email",
        location : {
            type: "string", optional: true
        },
        password: {
            type: "string", min:8
        }
    }
    const validate = v.compile(schema)
    return validate
}

exports.LoginValidator = (args) => {
    const schema = {
        email: "email",
        password: {
            type: "string"
        }
    }
    const validate = v.compile(schema)
    return validate
}
