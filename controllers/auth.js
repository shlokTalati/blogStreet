const User = require('../models/User');


function signup() {

    return async (req, res) => {

        let data = await User.findOne({email: req.body.signupEmail})

        if (data != null) {
            console.log(data);
            return res.redirect('/auth?message=UserAlreadyExists');
        }

        const {signupName, signupEmail, signupPassword, signupAge} = req.body;

        const newUser = new User({
            name: signupName,
            email: signupEmail,
            password: signupPassword,
            age: signupAge
        });

        let savedUser = await newUser.save();
        // console.log(savedUser)
        if(savedUser != null){
            return res.redirect('/auth?message=SignupSuccess');
        }
        else{
            return res.redirect('/auth?message=SignupFailed');
        }

    }
}

function login(){
    return async(req,res)=>{
        let user = await User.findOne({email: req.body.loginEmail, password: req.body.loginPassword});
        if(user != null){
            console.log(user);
            req.session.user = user;
            res.redirect('/');
        }
        else{
            res.redirect('/auth?message=LoginFailed');
        }
    }
}

function logout(){
    return (req, res)=>{
        req.session.destroy();
        return res.redirect('/auth');
    }
}

module.exports = {login, signup, logout};