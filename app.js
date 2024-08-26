const express = require("express");
const app = express();
const database_connection = require('./database_connection');
const session = require('express-session');
const {PORT} = require('./config');
const authRouter = require('./routes/auth');
const webRouter = require('./routes/web');

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret:"mysecret"
}))

app.use('/auth', authRouter);

// Middleware to inject user data

app.use((req, res, next) => {
    if(req.session.user != null){
        res.locals.user = req.session.user;
    }
    next();
});


app.use('/', webRouter);


app.listen(PORT, ()=>console.log("Server is running on port " + PORT));
