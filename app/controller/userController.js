function renderProfile(req, res){
    res.render("profile", {
        title: "User Profile",
        user:{
            name: req.user.name,
            email: req.user.email}
        }
    )
}

module.exports = {renderProfile};