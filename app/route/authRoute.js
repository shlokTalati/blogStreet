const express = require("express");
const {redirectIfLoggedIn, signupUser, loginUser} = require("../controller/authController");


const router = express.Router();
router.get("/logout", (req, res)=>{
    res.clearCookie("token"); // Clear JWT cookie
    res.redirect("/auth");
});


// Checking if the user is already logged in, so that loggedIn users cannot access Login Page
router.use(redirectIfLoggedIn);

// Renders the Login, Signup Form on the url /auth
router.get("/", (req, res) => {
    res.render("auth");
});


// Signup Route
router.post("/signup", signupUser);


// Login Route
router.post("/login", loginUser);

module.exports = router;