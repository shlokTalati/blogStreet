const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');




// -------------------------------
// IMPORTING ROUTES AND MIDDLEWARES
// -------------------------------
const authRoute = require('./app/route/authRoute');
const authenticateUser = require('./app/middleware/authMiddleware');
const homeRoute = require('./app/route/homeRoute');
const userRoute = require('./app/route/userRoute');
const postRoute = require('./app/route/postRoute');
const categoryRoute = require('./app/route/categoryRoute');







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


app.use(cookieParser()); // Makes the cookie accessible to the application

app.use('/auth', authRoute); // Auth Route placed above token checking because at the time of auth, user would not have a token, so Token checking would always prove false.

app.use(authenticateUser); // Allows access to application only if AUTHENTICATED


// *** Middleware to Automatically insert page content into the Body Tag of Layout File ***
app.use(expressLayouts);
app.set("layout", "layout");


app.use('/', homeRoute);
app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/category', categoryRoute);









app.listen(process.env.PORT, ()=>{ console.log('Server started on port 80') });