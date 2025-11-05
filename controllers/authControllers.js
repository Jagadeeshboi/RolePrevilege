const bcrypt = require('bcryptjs');
const { organisationadmin } = require('../models/organisationAdminModel');
module.exports = {
    signIn: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log(email, password)
            if (!email || !password) {
                req.flash("error", "email or password required");
                return res.redirect('/signin');
            }
            const userExist = await organisationadmin.findOne({ email });
            if (!userExist) {
                req.flash("error", "user not found");
                return res.redirect('/signin');
            }
            const ispasswordValid = await bcrypt.compare(password, userExist.password)
            if (!ispasswordValid) {
                req.flash("error", "password is invalid");
                return res.redirect('/signin')
            }
            req.flash("success", "successfully login")
            return res.redirect('/dashboard');
        } catch (error) {
            console.error('Error occurred:', error.message);
            req.flash("error", "internal server error");
            return res.redirect('/signin');
        }
    },
    renderSignIn: async (req, res) => {
        try {
            return res.render("index", {
                success: req.flash("success"),
                error: req.flash("error")
            });
        } catch (error) {
            console.error('Error occurred:', error.message);
            return res.redirect('/admin/v1/dashboard');
        }
    }
}