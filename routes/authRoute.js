const authControllers = require('../controllers/authControllers');

const authRoute = require('express')();

authRoute.get("/signin", authControllers.renderSignIn);
authRoute.post("/signin", authControllers.signIn)


module.exports = authRoute