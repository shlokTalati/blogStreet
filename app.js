const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');


const authRoutes = require('./app/route/authRoute');
const authenticateUser = require('./app/middleware/authMiddleware');



// BASIC FORMALITIES
// BASIC FORMALITIES
const app = express();
app.set("view engine", "ejs");
require('dotenv').config({path: './app/config/.env'});
const connectDB = require('./app/config/database');
connectDB();
// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set("views", path.join(path.resolve("app"), "view"));
app.use(express.static(path.join(path.resolve("app"), "public")));

// Auth Route is placed above token checking middleware because at the time of auth, user would not have a token.
app.use('/auth', authRoutes);

app.use(cookieParser());
app.use(authenticateUser);

app.get("/", (req, res) => {
    res.render("home");
});







app.listen(process.env.PORT, ()=>{ console.log('Server started on port 80') });