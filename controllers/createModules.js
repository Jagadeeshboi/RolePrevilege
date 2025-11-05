const { modules } = require("../models/organisationAdminModel");

module.exports = {
    createModule: async (req, res) => {
        try {
            const { moduleName, status } = req.body;
            if (!moduleName || !status) {
                return res.status(422).json({ message: "Feilds required" });
            }
            const moduleExist = await modules.findOne({ moduleName });
            if (moduleExist) {
                return res.status(403).json({ message: "Module is already exists" })
            }
            const module = await modules.create({ moduleName, status });
            return res.status(200).json({ message: "module is created", module })
        } catch (error) {
            console.error('Error occurred:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    getAllModules: async (req, res) => {
        try {
            const getModules = await modules.find({})
            return res.status(200).json({ messages: "modules fetched successfully", getModules });
        } catch (error) {
            console.error('Error occurred:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    updateModules: async (req, res) => {
        try {
            const { id } = req.params
            const previlleges = req.body
            console.log(previlleges);
            return;
            if (!id) {
                return res.status(422).json({ message: "id required" })
            }
            const moduleExists = await modules.findById(id)
            if (!moduleExists) {
                return res.status(404).json({ message: "module not found" })
            }
            moduleExists.priveleages.push([...previlleges])
            return res.status(200).json({ messages: "previlleges updated successfully" })
        } catch (error) {
            console.error('Error occurred:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

}