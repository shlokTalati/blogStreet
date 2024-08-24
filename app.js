const express = require("express");
const app = express();

const {PORT} = require('./config');

const authRouter = require('./routes/auth');
const webRouter = require('./routes/web');

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));


app.use('/auth', authRouter);
app.use('/', webRouter);


app.listen(PORT, ()=>console.log("Server is running on port " + PORT));
