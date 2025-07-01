const express = require("express");
const jwt = require("jsonwebtoken");
const {User} = require('../model/userModel');
const {hashPassword, verifyPassword} = require('../service/authService');

const router = express.Router();

function redirectIfLoggedIn(req, res, next){

    const token = req.cookies?.token

    try {
        // Verify the token
        jwt.verify(token, process.env.SECRET_KEY); // Attach decoded user info to req object
        // req.user = jwt.verify(token, process.env.SECRET_KEY); // Attach decoded user info to req object
        return res.redirect('/');
    } catch (error) {
        next();
    }
}

function renderAuthPage(req, res) {
    res.render("auth");
}

async function signupUser(req, res) {

    const { signupName, signupEmail, signupPassword } = req.body;

    try{

        const existingUser = await User.findOne({email: signupEmail});

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        let hashedPassword = await hashPassword(signupPassword) //Hash Password before saving

        const newUser = new User({ name: signupName, email: signupEmail, password: hashedPassword });
        await newUser.save();

        return res.redirect('/auth?msg=signupsuccess');
    }
    catch (err){
        return res.redirect('/auth?msg='+ err);
    }
}

async function loginUser(req, res){
    const { loginEmail, loginPassword } = req.body;


    try{
        const user = await User.findOne({email: loginEmail});
        if(await verifyPassword(loginPassword, user.password) === true){
            const token = jwt.sign({ _id: user._id ,name: user.name, email: user.email }, process.env.SECRET_KEY, { expiresIn: "1h" });
            res.cookie('token', token, {
                // sameSite: 'Strict' // Protects against CSRF
            });
            return res.redirect('/');
        }
        else{
            return res.redirect('/auth?msg=invalidcredentials')

        }
    }
    catch (err){
        return res.redirect('/auth?msg=' + err)

    }
}

function logoutUser(req, res){
        res.clearCookie("token"); // Clear JWT cookie
        res.redirect("/auth");
}

module.exports = {redirectIfLoggedIn, renderAuthPage, signupUser, loginUser, logoutUser}