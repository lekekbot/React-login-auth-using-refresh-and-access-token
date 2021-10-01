//routes.js

const authController = require('./controller/authController');

module.exports = (app, router) => {
    router.post('/api/authenticate', authController.processUserAuthenticate)
    router.get('/api/refresh-token', authController.refreshToken)
    router.get('/api/logout', authController.proccessUserLogout)
}