const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();


router.use((req, res, next) => {
    // Get token from headers or cookies
    const token = req.cookies?.token

    if (!token) {
        // return res.status(401).json({ message: "Access denied. Need to login" });
        return res.redirect('/auth?msg=accessdenied');
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; // Attach decoded user info to request
        res.locals.currentUser = decoded;
        next(); // Move to the next route
    } catch (error) {
        // return res.status(403).json({ message: "Invalid token." });
        return res.redirect('/auth?msg=invalidtoken')
    }
});


module.exports = router;
