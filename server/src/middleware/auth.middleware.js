const {connectionInstance} = require('../db/database');
const jwt = require('jsonwebtoken');

const verifyJWT = (req, res,next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access!'
            })
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        const query = 'Select fullname, email, user_type from users where email = ?';
        
        connectionInstance.query(query,[decodedToken?.email], (err, results) => {
            if (err) {
                return res.status(503).json({
                    success: false,
                    message: 'Internal server error!'
                })
            }
            if (!results) {
                return res.status(401), json({
                    success: false,
                    message: 'Invalid access token!'
                })
            }
            req.user = results;
            next();
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = verifyJWT;