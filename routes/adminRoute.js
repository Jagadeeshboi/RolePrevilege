const controllers = require('../controllers/createModules');

const adminRoute = require('express')();

// adminRoute.get("/signin", adminControllers.renderSignIn);
adminRoute.post("/modules", controllers.createModule)
    .get("/modules", controllers.getAllModules)
    .patch("/modules", updateModules)



module.exports = adminRoute