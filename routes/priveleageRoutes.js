const express = require("express");
const privileageRouter = express.Router();
const priveleagesController = require("../controllers/privileagesController");

privileageRouter.post("/create", priveleagesController.createPrivileage);
privileageRouter.patch("/edit/:priveleageId", priveleagesController.editPrivileageDetails);
privileageRouter.get("/all", priveleagesController.getAllPrivileages);
privileageRouter.patch("/status/:priveleageId", priveleagesController.changePrivileageStatus);

module.exports = privileageRouter;
