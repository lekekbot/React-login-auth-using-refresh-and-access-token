//authController.js

const bcrypt = require('bcryptjs');
const auth = require('../service/authService')
const jwt = require('jsonwebtoken');
const config = require('../config');


exports.processUserAuthenticate = async (req,res) => {
    let { email, password } = req.body

    try { 
        let results = await auth.authenticateUser(email)
        if(bcrypt.compareSync(password, results[0].password)) {
            const token = {
                user_id: results[0].user_id,
                displayName: results[0].username,
                email: results[0].email,
                token: jwt.sign({
                    userId: results[0].user_id,
                },
                    config.JWTkey, {
                    expiresIn: 60 * 5
                    // 5 minutes expiry
                })
            };

            const refresh_token = jwt.sign({user_id: results[0].user_id}, config.refresh_token_secret, {
                expiresIn: 60 * 60 * 24 * 3 //3 days 
            })

            res.cookie('refreshToken', refresh_token, {
                httpOnly: true,
                secure: true,
                signed: true,
                maxAge: 60 * 60 * 24 * 3  * 1000,
                sameSite: "none",
            })

            console.log('yes');
            return res.status(200).send(token)
        } else {
            console.log('no');
            return res.status(401).send('Login Failed')
        }
    } catch (error) {
        console.log(error)
        return res.status(401).send('Invalid Credentials');
    }
}

exports.refreshToken = async (req,res) => {
    const { signedCookies = {} } = req //get the cookie from the request header
    const { refreshToken } = signedCookies //get the cookie by key

    if(refreshToken) {
        try {
            const payload = jwt.verify(refreshToken, config.refresh_token_secret)
            const userId = payload.user_id

            let getUser = await auth.findUser(userId)

            if(getUser.length == 1) {
                const token = {
                    user_id: getUser[0].user_id,
                    displayName: getUser[0].username,
                    email: getUser[0].email,
                    token: jwt.sign({
                        userId: getUser[0].user_id,
                    },
                        config.JWTkey, {
                        expiresIn: 60 * 5
                        // 5 minutes expiry
                    })
                };

                //updates refresh token (remember me feature)
                const refresh_token = jwt.sign({user_id: getUser[0].user_id}, config.refresh_token_secret, {
                    expiresIn: 60 * 60 * 24 * 3 //3 days 
                })
    
                res.cookie('refreshToken', refresh_token, {
                    httpOnly: true,
                    signed: true,
                    secure: true,
                    maxAge: 60 * 60 * 24 * 3  * 1000,
                    sameSite: "none",
                })
                return res.status(200).send(token);
            } else {
                console.log('here3');
                return res.status(401).send()
            }

        } catch (error) {
        console.log(error);
        return res.status(401).send()
        }
    } else {
        console.log('here');
        return res.status(401).send()
    }   
}

exports.proccessUserLogout = async (req,res) => {
    const { signedCookies = {} } = req
    const { refreshToken } = signedCookies

    if(refreshToken) {
        try {
            const payload = jwt.verify(refreshToken, config.refresh_token_secret)
            const userId = payload.user_id
            let getUser = await auth.findUser(userId)

            if(getUser.length == 1) {
                res.clearCookie('refreshToken')
                return res.status(200).send('success')
            }
        }catch(error) {
            return res.status(401).send('error')
        }
    } else {
        return res.status(401).send('error')
    }
}

exports.getRequest = (req,res) => {
    return res.status(200).send('success')
}
