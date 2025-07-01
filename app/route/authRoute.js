const express = require("express");
const {redirectIfLoggedIn, renderAuthPage, signupUser, loginUser, logoutUser} = require("../controller/authController");


const router = express.Router();

router.get("/logout", logoutUser);

// Checking if the user is already logged in, so that loggedIn users cannot access Login Page
router.use(redirectIfLoggedIn);

// Renders the Login, Signup Form on the url /auth
router.get("/", renderAuthPage);

// Signup Route
router.post("/signup", signupUser);

// Login Route
router.post("/login", loginUser);

module.exports = router;