const express = require("express");
const jwt = require("jsonwebtoken");
const {User} = require('../model/userModel');

const router = express.Router();


router.get("/logout", (req, res)=>{
    res.clearCookie("token"); // Clear JWT cookie
    res.redirect("/auth");
});


// Checking if the user is already logged in, so that loggedIn users cannot access Login Page
router.use((req, res, next)=>{

    const token = req.cookies?.token

    try {
        // Verify the token
        jwt.verify(token, process.env.SECRET_KEY); // Attach decoded user info to req object
        // req.user = jwt.verify(token, process.env.SECRET_KEY); // Attach decoded user info to req object
        return res.redirect('/');
    } catch (error) {
        next();
    }
});



router.get("/", (req, res) => { // Renders the Login, Signup Form on the url /auth
    res.render("auth");
});

// Signup Route
router.post("/signup", async (req, res) => {
    const { signupName, signupEmail, signupPassword } = req.body;

    const existingUser = await User.findOne({email: signupEmail});

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name: signupName, email: signupEmail, password: signupPassword });
    await newUser.save();

    return res.redirect('/auth?msg=signupsuccess');
});



// Login Route
router.post("/login", async (req, res) => {
    const { loginEmail, loginPassword } = req.body;

    const user = await User.findOne({email: loginEmail});

    if (!user || user.password !== loginPassword) {
        res.redirect('/auth?msg=invalidcredentials')
    }

    const token = jwt.sign({ id: user._id ,name: user.name, email: user.email }, process.env.SECRET_KEY, { expiresIn: "1h" });
    res.cookie('token', token, {
        // sameSite: 'Strict' // Protects against CSRF
    });
    return res.redirect('/');
});

module.exports = router;