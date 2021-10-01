//authService
const pool = require('./databaseConfig')

//code - Authenticates the user whether their acc matches wtv they have made
module.exports.authenticateUser = (email) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Database connection error ", err);
                resolve(err);
            } else {
                try {
                    let query =
                        `SELECT 
                                * 
                            FROM 
                                users
                            where 
                                email = ?`;
                    connection.query(query, [email], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            if (result.length == 1) {
                                resolve(result);
                            } else {
                                reject(result);
                            }
                        }
                        connection.release();
                    });
                } catch (error) {
                    resolve(err);
                }
            }
        });
    });
}

module.exports.findUser = (userid) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Database connection error ", err);
                resolve(err);
            } else {
                try {
                    let query =
                        `SELECT 
                                * 
                            FROM 
                                users
                            where 
                                user_id = ?`;
                    connection.query(query, [userid], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            if (result.length == 1) {
                                resolve(result);
                            } else {
                                reject(result);
                            }
                        }
                        connection.release();
                    });
                } catch (error) {
                    resolve(err);
                }
            }
        });
    });
}