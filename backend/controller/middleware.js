//authController.js

const auth = require('../service/authService')
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.checkToken = (req,res,next) => {
    console.log(req.headers);
    const { signedCookies = {} } = req //get the cookie from the request header
    console.log(signedCookies);
    const { refreshToken } = signedCookies //get the cookie by key

    console.log(refreshToken)
    if(refreshToken) {
        next()
    } else {
        return res.send(500)
    }
}

//vuln to MITM attack
