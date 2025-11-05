const { modules, slug } = require("../models/organisationAdminModel");

module.exports = {
    dashboard: async (req, res) => {
        try {
            res.render("dashboard", {
                success: req.flash("error"),
                error: req.flash("error")
            })
        } catch (error) {
            console.error('Error occurred:', error.message);
            return res.redirect('/dashboard');
        }
    },
    roles: async (req, res) => {
        try {
            return res.render("rolePrevillege",
                {
                    success: req.flash("error"),
                    error: req.flash("error")
                })
        } catch (error) {
            console.error('Error occurred:', error.message);
            return res.redirect('/admin/v1/dashboard');
        }
    },
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
            if (!id) {
                return res.status(422).json({ message: "id required" })
            }
            const moduleExists = await modules.findById(id)
            if (!moduleExists) {
                return res.status(404).json({ message: "module not found" })
            }
            moduleExists.priveleages.push(previlleges?.previlleges)
            await moduleExists.save();
            return res.status(200).json({ messages: "previlleges updated successfully" })
        } catch (error) {
            console.error('Error occurred:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    slugCreation: async (req, res) => {
        try {
            const { name, slugName } = req.body;
            if (!name || !slugName || !slugName.split(" ").length > 2) {
                return res.status(422).json({ message: "Feilds required" })
            }
            const slugIsExist = await slug.findOne({ name, slugName: slugName.replace(/(\b\w+)\s+(\w+\b)/g, "$1.$2") });
            if (slugIsExist) {
                return res.status(403).json({ message: "name is already exists" });
            }
            const slugc = await slug.create({ name, slugName: slugName.replace(/(\b\w+)\s+(\w+\b)/g, "$1.$2") });
            return res.status(201).json({ message: "slug created successfully", slug: slugc });
        } catch (error) {
            console.error('Error occurred:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    upadteSlug: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            if (!id || !status) {
                return res.status(420).json({ message: "Feilds required" })
            }
            await slug.findByIdAndUpdate({ _id: id }, { $set: { status } })
            return res.status(201).json({ message: "Status updated successfully" })
        } catch (error) {
            console.error('Error occurred:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

}