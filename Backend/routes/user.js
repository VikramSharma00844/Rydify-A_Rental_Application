var express = require('express');
var userrouter = express.Router();
var cookieParser = require('cookie-parser');
userrouter.use(cookieParser());
//json get krne ke liye
userrouter.use(express.urlencoded({extended: true}));
userrouter.use(express.json());
var jwt = require('jsonwebtoken');
var secret_key = 'abcd#$%@12345678';
var userController = require('../controllers/userController');
const indexcontroller = require("../controllers/indexController");
const adminController = require("../controllers/adminController");

function AuthorizeUser(req, res, next) {
    // console.log(req.cookies.UserToken);
    var token = req.cookies.UserToken;
    if (!token) //agar token nahi hai toh seedha login page pe lae jao
    {
        //console.log("NO TOKEN");
        res.redirect('/user/login');
    } else {
        try //token manually change hua hai yaa nahi verify krna hai
        {
            req.user = jwt.verify(token, secret_key); //data nikalo payload wala
            next();
        } catch (e) {
            res.redirect('/user/login');
        }
    }
}

//json value k liye middleware
function AuthorizeUser_HTTP(req, res, next) {
    // console.log(req.cookies.UserToken);
    const token = req.headers.authorization.split(" ")[1]

    if (!token) //agar token nahi hai toh seedha login page pe lae jao
    {
        res.json({error: true, message: 'Login Required'});
    } else {
        try //token manually change hua hai yaa nahi verify krna hai
        {
            req.user = jwt.verify(token, secret_key); //data nikalo payload wala
            next();
        } catch (e) {
            res.json({error: true, message: 'Unautherized Access'});
        }
    }
}

userrouter.get('/signup',userController.renderSignUpPage);
userrouter.get('/login',userController.renderLoginPage);
userrouter.post('/register', userController.registerUser);
userrouter.post('/login', userController.loginUser);
userrouter.get('/token',userController.checkToken);
userrouter.post('/contact-us',userController.contactHandler);
//dashboard
userrouter.get('/dashboard', AuthorizeUser, userController.renderDashBoard);
//booking car
userrouter.get('/booking/:id',AuthorizeUser,userController.renderBooking);
userrouter.get('/fetchVehicles/:id',AuthorizeUser_HTTP,userController.fetchVehicles)
userrouter.post('/booking',AuthorizeUser_HTTP, userController.BookVehicle);
userrouter.put('/updateVehicle/:id',AuthorizeUser_HTTP,userController.updateVehicle);
userrouter.put('/updateDriver/:id',AuthorizeUser_HTTP,userController.updateDriver);
//thankyou
userrouter.get('/thankyou',AuthorizeUser_HTTP,userController.thankyou);

//logout
userrouter.get('/logout', AuthorizeUser_HTTP, userController.logoutUser);
//render profile page
userrouter.get('/profile', AuthorizeUser, userController.renderProfile);
//show profile
userrouter.get('/showProfile', AuthorizeUser_HTTP, userController.showProfile);
//update profile
userrouter.put('/updateProfile/:id', AuthorizeUser_HTTP, userController.updateProfile);
userrouter.put('/update_profile/:id', AuthorizeUser_HTTP, userController.updateProfile2);
//render change password
userrouter.get('/changePassword', AuthorizeUser, userController.changePassword);
//fetch passsword
userrouter.put('/changePassword', AuthorizeUser_HTTP, userController.updatePassword);

//my bookings
userrouter.get('/view_booking',AuthorizeUser,userController.renderMyBooking);
userrouter.get('/fetchMybooking',AuthorizeUser_HTTP,userController.fetchMyBookings);

//review
userrouter.post('/addreview',AuthorizeUser_HTTP,userController.addReview);

//fetch driver
userrouter.get('/fetchdriver',AuthorizeUser_HTTP,userController.fetchDriver);


userrouter.get('/fetchfair/:id',userController.FetchMyFair);

//route
userrouter.get('/verify-token', userController.verifyToken)

module.exports = userrouter;