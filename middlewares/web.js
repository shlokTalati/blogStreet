
function checkLoggedInStatus(){
    return (req, res, next)=>{
    if (req.session.user == null) {
        return res.redirect('/auth');
    }
    next();
}
}

module.exports = {checkLoggedInStatus}