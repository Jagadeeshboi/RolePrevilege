const mongoose = require("mongoose");
const { roles, modules } = require("../models/organisationAdminModel");

module.exports = {
  createRole: async (req, res) => {
    try {
      const { roleName, moduleIds, status } = req.body;

      if (!roleName) {
        return res.status(400).json({ message: "role name is required." });
      }

      if (!Array.isArray(moduleIds) || moduleIds.length === 0) {
        return res.status(400).json({ message: "give atlests 1 module id." });
      }

      for (const id of moduleIds) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res
            .status(400)
            .json({ message: "Invalid module ID,pls chekc" });
        }
      }

      if (!status && !(["Active", "Inactive"].includes(status))) {
        return res
          .status(400)
          .json({ message: "Invalid module ID,pls chekc" });

      }

      const existingRole = await roles.findOne({ roleName });
      if (existingRole) {
        return res.status(400).json({ message: "role already there." });
      }

      const newRole = await roles.create({
        roleName: roleName,
        modules: moduleIds,
        status: status || "Active",
      });

      return res.status(201).json({
        message: "role created",
        data: newRole,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  editRoleDetails: async (req, res) => {
    try {
      const { roleId } = req.params;
      const { roleName, moduleIds, status } = req.body;

      if (!mongoose.Types.ObjectId.isValid(roleId)) {
        return res.status(400).json({ message: "iinvalid role id." });
      }
      const role = await roles.findById(roleId);
      if (!role) {
        return res.status(404).json({ message: "role not there." });
      }

      if (roleName) {
        const existingRole = await roles.findOne({
          roleName,
          _id: { $ne: roleId },
        });
        if (existingRole) {
          return res
            .status(400)
            .json({
              message: "role name already there,say different role name.",
            });
        }
        role.roleName = roleName;
      }

      console.log(moduleIds);
      if (Array.isArray(moduleIds)) {
        for (const id of moduleIds) {
          if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
              .status(400)
              .json({ message: "Invalid module ids ,pls check module ids" });
          }
          const checkModuleId = await modules.findOne({ _id: id });
          console.log(checkModuleId);
          if (!checkModuleId) {
            return res
              .status(400)
              .json({ message: "Invalid module ids ,pls check module ids" });
          }
        }

        role.modules = moduleIds;
      }
      console.log(role.modules);
      if (status && ["Active", "Inactive"].includes(status)) {
        role.status = status;
      }
      const updatedRole = await role.save();

      return res.status(200).json({
        message: "roles eidted.",
        data: updatedRole,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getAllRoles: async (req, res) => {
    try {
      const allRoles = await roles
        .find()
        // .populate("modules")
        .populate({
          path: "modules",
          populate: {
            path: "priveleages",
            populate: {
              path: "slug",
            },
          },
        })
        .sort({ createdAt: -1 });

      return res.status(200).json({
        message: "roles fetched",
        data: allRoles,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getIndividualRoleDetails: async (req, res) => {
    try {
      const { roleId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(roleId)) {
        return res.status(400).json({ message: "iinvalid role id" });
      }

      const role = await roles.findById(roleId)
        //   populate("modules");
        .populate({
          path: "modules",
          populate: {
            path: "priveleages",
            populate: {
              path: "slug",
            },
          },
        });

      if (!role) {
        return res.status(404).json({ message: "role not there." });
      }

      return res.status(200).json({
        message: "role details fetched",
        data: role,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  changeRoleStatus: async (req, res) => {
    try {
      const { roleId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(roleId)) {
        return res.status(400).json({ message: "jhhjnvalid role id." });
      }

      const role = await roles.findById(roleId);
      if (!role) {
        return res.status(404).json({ message: "role not there." });
      }

      role.status = role.status === "Active" ? "Inactive" : "Active";
      await role.save();

      return res.status(200).json({
        message: "role status updated",
        data: role,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  renderAllRoles: async (req, res) => {
    try {
      const allRoles = await this.roles.find({});
      if (!allRoles) {
        req.flash("error", "Cannot Fetch Roles");
        return res.redirect("/admin/v1/dashboard");
      }
      return res.render("allRroles",
        {
          success: req.flash("error"),
          error: req.flash("error"),
          allRoles
        })
    } catch (error) {
      console.error(error.message);
      return res.redirect('/admin/v1/dashboard');
    }
  },
  renderIndividualRole: async (req, res) => {
    try {
      const { roleId } = req.params;
      if (!roleId) {
        req.flash("error", "Please Enter Valid Role Id.");
        return res.redirect("/admin/v1/dashboard");
      }
      const singleRole = await this.roles.findById({ _id: roleId });
      if (!singleRole) {
        req.flash("error", "Cannot Fetch the Role");
        return res.redirect("/admin/v1/dashboard");
      }
      return res.render("singleRole",
        {
          success: req.flash("error"),
          error: req.flash("error"),
          allRoles
        })
    } catch (error) {
      console.error(error.message);
      return res.redirect('/admin/v1/dashboard');
    }
  }
};
