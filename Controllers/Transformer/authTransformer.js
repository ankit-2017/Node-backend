
exports.userTransformer = (args, token) => {
    console.log(args, token)
    return {
        id: args._id,
        name: args.name,
        email: args.email,
        location : args.location ? args.location : "",
        employed : args.employed ? args.employed : "",
        token
    }
}