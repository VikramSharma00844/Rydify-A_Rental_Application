var express = require('express');
var dealerRouter = express.Router();
dealerRouter.use(express.json());
//post method wala object get krne ke liye
dealerRouter.use(express.urlencoded({extended: true}));

var cookieParser = require('cookie-parser');
dealerRouter.use(cookieParser());

var dealerController = require('../controllers/dealerController');
const jwt = require("jsonwebtoken");
var secret_key = 'abcd#$%@12345678';
const userController = require("../controllers/userController");

function AuthorizeDealer(req, res, next) {
    // console.log(req.cookies.UserToken);
    var token = req.cookies.DealerToken;
    if (!token) //agar token nahi hai toh seedha login page pe lae jao
    {
        //console.log("NO TOKEN");
        res.redirect('/dealer/login');
    } else {
        try //token manually change hua hai yaa nahi verify krna hai
        {
            req.dealer = jwt.verify(token, secret_key); //data nikalo payload wala
            next();
        } catch (e) {
            res.redirect('/dealer/login');
        }
    }
}

//json value k liye middleware
function AuthorizeDealer_HTTP(req, res, next) {
    // console.log(req.cookies.UserToken);
    const token = req.headers.authorization.split(" ")[1]

    if (!token) //agar token nahi hai toh seedha login page pe lae jao
    {
        res.json({error: true, message: 'Login Required'});
    } else {
        try //token manually change hua hai yaa nahi verify krna hai
        {
            req.dealer = jwt.verify(token, secret_key); //data nikalo payload wala
            next();
        } catch (e) {
            res.json({error: true, message: 'Unautherized Access'});
        }
    }
}


dealerRouter.get('/signup', dealerController.RenderSignup);
dealerRouter.get('/login',dealerController.RenderLogin);
dealerRouter.post('/register', dealerController.registerDealer);
dealerRouter.post('/login', dealerController.loginDealer);
dealerRouter.get('/token',dealerController.CheckToken)
dealerRouter.get('/dashboard',AuthorizeDealer,dealerController.renderDashboard);
//manage cars
dealerRouter.get('/manage_vehicle',AuthorizeDealer,dealerController.renderManageVehicle);
dealerRouter.get('/fetchCategories',AuthorizeDealer_HTTP,dealerController.fetchCategories);
dealerRouter.get('/fetchCategory/:id',AuthorizeDealer_HTTP,dealerController.fetchCategory);
dealerRouter.post('/addvehicle',AuthorizeDealer_HTTP,dealerController.addVehicle);
dealerRouter.get('/fetchMyVehicle',AuthorizeDealer_HTTP,dealerController.fetchMyVehicle);
dealerRouter.delete('/delete_vehicle/:id',AuthorizeDealer_HTTP,dealerController.deleteVehicle);

//logout
dealerRouter.get('/logout', AuthorizeDealer_HTTP, dealerController.logoutUser);
//render profile page
dealerRouter.get('/profile', AuthorizeDealer, dealerController.renderProfile);
//show profile
dealerRouter.get('/showProfile', AuthorizeDealer_HTTP, dealerController.showProfile);
//update profile
dealerRouter.put('/updateProfile/:id', AuthorizeDealer_HTTP, dealerController.updateProfile);
dealerRouter.put('/update_profile/:id', AuthorizeDealer_HTTP, dealerController.updateProfile2);
//render change password
dealerRouter.get('/changePassword', AuthorizeDealer, dealerController.changePassword);
//fetch passsword
dealerRouter.put('/changePassword', AuthorizeDealer_HTTP, dealerController.updatePassword);

//manage booking
dealerRouter.get('/manage_booking_req',AuthorizeDealer,dealerController.renderBookingReq);
dealerRouter.get('/fetchbooking',AuthorizeDealer_HTTP,dealerController.fetchBookings);
dealerRouter.put('/updatebooking/:id',AuthorizeDealer_HTTP,dealerController.UpdateBookings);
dealerRouter.put('/updateDriver/:id',AuthorizeDealer_HTTP,dealerController.updateDriver);
//send email
dealerRouter.post('/send-email',AuthorizeDealer_HTTP, dealerController.sendEmail);
//manage approved req
dealerRouter.get('/view_approved_req',AuthorizeDealer,dealerController.renderApprovedReq);
dealerRouter.get('/fetchapprovedbooking',AuthorizeDealer_HTTP,dealerController.fetchApprovedReq);
dealerRouter.put('/updateVehicle/:id',AuthorizeDealer_HTTP,dealerController.updateVehicle);

//manage cancelled booking
dealerRouter.get('/view_cancelled_req',AuthorizeDealer,dealerController.renderCancelledReq);
dealerRouter.get('/fetchcancelledbooking',AuthorizeDealer_HTTP,dealerController.fetchCancelledReq);

//completed
dealerRouter.get('/view_completed_req',AuthorizeDealer,dealerController.renderCompletedReq);
dealerRouter.get('/fetchcompletedbooking',AuthorizeDealer_HTTP,dealerController.fetchCompletedReq);


dealerRouter.post('/addfare',AuthorizeDealer_HTTP,dealerController.addfare);


//route
dealerRouter.get('/verify-token', dealerController.verifyToken)

module.exports = dealerRouter;