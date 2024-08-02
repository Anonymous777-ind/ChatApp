const mysql = require("mysql");

const connectionInstance = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER_DB,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

const connectDB = () => {
    try {
        connectionInstance.connect((error) => {
            if (error) {
                console.log('Unable to connect!', error);
                return;
            }
            console.log('Connection established to MySQL Server!');
        });

    } catch (error) {
        console.log('Error occured while creating the connection with Mysql server: ', error);
    }
};

module.exports = {
    connectDB,
    connectionInstance
};