const bcrypt = require('bcryptjs');
module.exports = {
    signIn: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                req.flash("email or password required");
                return res.redirect('/signin');
            }
            const userExist = await organiZation.find({ emai });
            if (!userExist) {
                req.flash("user not found");
                return res.redirect('/signin');
            }
            const ispasswordValid = await bcrypt.compare(password, userExist.password)
            if (!ispasswordValid) {
                req.flash("password is invalid");
                return res.redirect('/signin')
            }
            return res.redirect('/dashboard');
        } catch (error) {
            console.error('Error occurred:', error.message);
            req.flash("internal server error");
            return res.redirect('/signin');
        }
    },
    renderSignIn: async (req, res) => {
        try {
            res.render("index");
        } catch (error) {
            console.error('Error occurred:', error.message);
            return res.redirect('/admin/v1/dashboard');
        }
    }
}