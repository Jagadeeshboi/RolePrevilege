const mongoose = require("mongoose");
const { priveleages, slug } = require("../models/organisationAdminModel");

module.exports = {
  createPrivileage: async (req, res) => {
    try {
      const { priveleageName, slugIds, status } = req.body;

      if (!priveleageName) {
        return res.status(400).json({ message: "privilege name is needed." });
      }

      if (!Array.isArray(slugIds) || slugIds.length === 0) {
        return res.status(400).json({ message: "give 1 slug id atleast." });
      }

      for (const id of slugIds) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid slug id" });
        }
      }
      if (status) {
        if (status === "Active" || status === "Inactive") {
        } else {
          return res.status(400).json({
            message: "Invalid status. allowed values are Active&Inactive",
          });
        }
      }
      const existingPriv = await priveleages.findOne({ priveleageName });
      if (existingPriv) {
        return res
          .status(400)
          .json({ message: "this prievileage already exists" });
      }

      const newPriv = await priveleages.create({
        priveleageName,
        slug: slugIds,
        status: status || "Active",
      });

      return res.status(201).json({
        message: "privilege created",
        data: newPriv,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  editPrivileageDetails: async (req, res) => {
    try {
      const { priveleageId } = req.params;
      const { priveleageName, slugIds, status } = req.body;

      if (!mongoose.Types.ObjectId.isValid(priveleageId)) {
        return res.status(400).json({ message: "wrong privilege id." });
      }

      const priv = await priveleages.findById(priveleageId);
      if (!priv) {
        return res.status(404).json({ message: "privilege not there." });
      }

      if (priveleageName) {
        const existingPrivileage = await priveleages.findOne({
          priveleageName,
          _id: { $ne: priveleageId },
        });
        if (existingPrivileage) {
          return res.status(400).json({
            message: "privilege name there ,plz enter differnrt name.",
          });
        }
        priv.priveleageName = priveleageName;
      }

      if (Array.isArray(slugIds)) {
        for (const id of slugIds) {
          const checkSlugId = await slug.findOne({ _id: id });
          if (!checkSlugId) {
            return res.status(400).json({ message: "iinvalid slug id" });
          }
          if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "invalid slug id" });
          }
        }
        priv.slug = slugIds;
      }

      if (status) {
        if (status === "Active" || status === "Inactive") {
        } else {
          return res.status(400).json({
            message: "Invalid status. allowed values are Active&Inactive",
          });
        }
      }

      const updatedPriv = await priv.save();
      return res.status(200).json({
        message: "privilege updated",
        data: updatedPriv,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getAllPrivileages: async (req, res) => {
    try {
      const allPrivileages = await priveleages
        .find()
        .populate("slug")
        .sort({ createdAt: -1 });

      return res.status(200).json({
        message: "privileges fetched",
        data: allPrivileages,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  changePrivileageStatus: async (req, res) => {
    try {
      const { priveleageId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(priveleageId)) {
        return res.status(400).json({ message: "invalid privilege id." });
      }

      const priv = await priveleages.findById(priveleageId);
      if (!priv) {
        return res.status(404).json({ message: "privilege not there." });
      }

      priv.status = priv.status === "Active" ? "Inactive" : "Active";
      await priv.save();

      return res.status(200).json({
        message: "privilege status updated.",
        data: priv,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
