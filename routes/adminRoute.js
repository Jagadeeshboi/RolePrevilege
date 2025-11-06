const controllers = require('../controllers/createModules');

const adminRoute = require('express')();

// adminRoute.get("/signin", adminControllers.renderSignIn);
adminRoute.post("/modules", controllers.createModule)
    .get("/modules", controllers.getAllModules)
    .patch("/modules/:id", controllers.updateModules)

adminRoute.get("/dashboard", controllers.dashboard)

adminRoute.post("/slugs", controllers.slugCreation)
    .patch("/slugs", controllers.upadteSlug);


adminRoute.get("/rendermodules",controllers.renderAllModules);
adminRoute.get("/singlemodule",controllers.renderIndividualModule);

module.exports = adminRoute