const settingsRouter = require("express").Router();
const settingsController = require("../controllers/settingsController");

settingsRouter.get("/settings",settingsController.renderOrganisationAdminDetails);
settingsRouter.post("/updateprofile",settingsController.updateProfile);
settingsRouter.post("/changepassword",settingsController.changePassword);


module.exports = settingsRouter;
