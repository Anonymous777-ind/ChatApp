const { connectionInstance } = require('../db/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// User login controller
module.exports.loginController = (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required!'
        });
    }

    const query = 'select * from users where email = ?';

    if (!connectionInstance) {
        return res.status(500).json({
            success: false,
            message: 'Database connection not established!'
        });
    }

    try {
        connectionInstance.query(query, [email], async (err, results) => {
            if (err) {
                console.log('Error occured: ', err.message);
                return res.status(500).json({
                    success: false,
                    message: 'Internal Server Error!'
                });
            }

            // Check if user exists
            if (results.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found!'
                });
            }

            const user = results[0];

            // Decrypt the encrypted password and then compare
            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if (!isPasswordCorrect) {
                return res.status(200).json({
                    status: false,
                    message: 'Incorrect password!'
                });
            }

            // User details required to be sent to the frontend
            const user_info = {
                id: user.id,  
                email: user.email,
                fullname: user.fullname,
                user_type: user.user_type
            }

            // Create token 
            const token = jwt.sign(user_info, process.env.JWT_SECRET_TOKEN, { expiresIn: '24h' })

            return res.status(200).json({
                status: true,
                message: 'Login successful',
                token
            });

        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

// User register controller
module.exports.registerController = async (req, res) => {
    const { fullname, email, password } = req.body;

    // Validate input
    if (!fullname || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required!'
        });
    }

    // Encrypt password before saving into database
    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log(encryptedPassword);

    // Sql query to insert values into table
    const query = 'insert into users (fullname, email, password) values (?,?,?)';

    if (!connectionInstance) {
        return res.status(500).json({
            success: false,
            message: 'Database connection not established!'
        });
    }

    try {
        connectionInstance.query(query, [fullname, email, encryptedPassword], (err, result) => {
            if (err) {
                console.log('Error occured: ', err.message);
                return;
            }
            res.status(200).json({
                success: true,
                message: 'User registered successfully!'
            })
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}


// Get all users
module.exports.getAllUsersController = (req, res) => {
    const query = 'select id,email,fullname from users';
    const data =[]
    try {
        connectionInstance.query(query, (err, results) => {
            if (err) {
                return res.status(503).json({
                    success: false,
                    message: err.message
                });
            }

            if (!results) {
                return res.status(401).json({
                    success: false,
                    message: 'No user yet!'
                })
            }
            
            const data = results;

            return res.status(202).json({
                success: true,
                data
            })
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
}