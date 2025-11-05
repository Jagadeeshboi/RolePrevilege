const authControllers = require('../controllers/authControllers');

const authRoute = require('express')();

authRoute.get("/signIn", authControllers.renderSignIn);
authRoute.post("/signIn", authControllers.signIn)

module.exports = authRoute