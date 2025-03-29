function renderProfile(req, res){
    res.render("profile", {
        title: "User Profile",
        user:{
            name: req.user.name,
            email: req.user.email}
        }
    )
}

function updateProfile(req, res){

}

module.exports = {renderProfile};