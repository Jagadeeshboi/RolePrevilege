const { organisationadmin } = require("../models/organisationAdminModel");
const bcrypt = require("bcryptjs");


module.exports = {

  renderOrganisationAdminDetails: async (req, res) => {
    try {

      const adminId = req.session.organisationadmin;
      const admin = await organisationadmin.findById(adminId);

      if (!admin) return res.status(404).send("Admin not found");

    return  res.render("admin/settings", {
        admin,
      });
    } catch (error) {
      console.error(error);
     return res.redirect("/admiv/v1/dashboard");
    }
  },

  
  updateProfile: async (req, res) => {
    try {
      const adminId = req.session.organisationadmin;
      console.log(adminId)
      const { name } = req.body;
      console.log(name);

      if (!name) {
        return res.status(400).json({ message: "Name is required." });
      }

      const updatedProfile = await organisationadmin.findByIdAndUpdate(
        adminId,
        { name },
        { new: true }
      );
   return res.render("admin/settings", {
        admin:updatedProfile,
      });
     
    } catch (error) {
      console.error(error);
      return res.redirect("/admiv/v1/dashboard");

    }
  },


  changePassword: async (req, res) => {
    try {
      const adminId = req.session.organisationadmin;
    
      if(!adminId)
      {
        req.flash("error","Admin Not Found.");
        return res.redirect("/adminsettings/settings");
      }
      const { oldPassword, newPassword } = req.body;
    
      if (!oldPassword || !newPassword) {
        req.flash("error","Please Enter all Fields");
        return res.redirect("/adminsettings/settings");
      }

      const admin = await organisationadmin.findById(adminId);
      if (!admin)
        { 
       req.flash("error","Organisation Admin Not Found");
        return res.redirect("/adminsettings/settings");
    }

      const isMatch = await bcrypt.compare(oldPassword, admin.password);
      if (!isMatch)
        { 
           req.flash("error","Incorrect Old Password");
        return res.redirect("/adminsettings/settings");
    }

      const hashed = await bcrypt.hash(newPassword, 10);
      admin.password = hashed;
      await admin.save();
      req.flash("success","Password Updated")
  return res.render("admin/settings", {
        admin,
      });
     
    } catch (error) {
      console.error(error);
      return res.redirect("/admin/v1/dashboard");
    }
  },

};
