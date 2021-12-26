//routes.js

const authController = require('./controller/authController');
const middleware = require('./controller/middleware')
module.exports = (app, router) => {
    router.post('/api/authenticate', authController.processUserAuthenticate)
    router.get('/api/refresh-token', authController.refreshToken)
    router.get('/api/logout', authController.proccessUserLogout)

    //request testing
    router.get('/api/get', middleware.checkToken, authController.getRequest)
    router.post('/api/post', middleware.checkToken, authController.getRequest)
    router.put('/api/put', middleware.checkToken, authController.getRequest)
    router.delete('/api/delete', middleware.checkToken, authController.getRequest)
}