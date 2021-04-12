const jwt = require('jsonwebtoken');

exports.verifyJwtToken = (req, res, next) => {
    var token = req.headers.authorization;
    if (!token){
        return res.status(401).json({ 
            error: false, 
            message: 'No token provided.' 
        });
    } 
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err){
            return res.status(401).json({ 
                error: true, 
                message: 'Unauthorised access.' 
            });
        } 
        req.decoded = decoded;
        next();
    });
}