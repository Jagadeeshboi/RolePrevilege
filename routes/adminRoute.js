const controllers = require('../controllers/createModules');

const adminRoute = require('express')();

// adminRoute.get("/signin", adminControllers.renderSignIn);
adminRoute.post("/modules", controllers.createModule)
    .get("/modules", controllers.getAllModules)
    .patch("/modules/:id", controllers.updateModules)

adminRoute.get("/dashboard", controllers.dashboard)
    .get("/roles", controllers.roles);

adminRoute.post("/slugs", controllers.slugCreation)
    .patch("/slugs", controllers.upadteSlug);



module.exports = adminRoute