const rolesController = require('../controllers/rolesController');

const rolesRouter = require('express')();

rolesRouter.post("/roles", rolesController.createRole);
rolesRouter.patch("/roles/:roleId", rolesController.editRoleDetails);
rolesRouter.get("/roles", rolesController.getAllRoles);
rolesRouter.get("/roles/:roleId", rolesController.getIndividualRoleDetails);
rolesRouter.patch("/roles/:roleId/status", rolesController.changeRoleStatus);


module.exports=rolesRouter;