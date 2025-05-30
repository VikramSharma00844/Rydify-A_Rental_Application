var express = require('express');
var adminRouter = express.Router();

var jwt=require('jsonwebtoken');
var secret_key='abcd#$%@12345678';

//json get krne ke liye
adminRouter.use(express.urlencoded({extended:true}));
adminRouter.use(express.json());

var cookieParser=require('cookie-parser');
adminRouter.use(cookieParser());

var adminController = require("../controllers/adminController");
const dealerController = require("../controllers/dealerController");


function AuthorizeAdmin(req,res,next)
{

    //console.log(req.cookies);
    var token=req.cookies.AdminToken;
    if(!token) //agar token nahi hai toh seedha login page pe lae jao
    {
        res.redirect('/login');
    }
    else {
        try //token manually change hua hai yaa nahi verify krna hai
        {
            req.admin=jwt.verify(token,secret_key); //data nikalo payload wala
            next();
        }
        catch(e)
        {
            res.redirect('/login');
        }
    }
}

//json value k liye middleware

function AuthorizeAdmin_HTTP(req,res,next)
{
        const token = req.headers.authorization.split(" ")[1]
    if(!token) //agar token nahi hai toh seedha login page pe lae jao
    {
        res.json({error:true,message:'Unautherized Access'});
    }
    else {
        try //token manually change hua hai yaa nahi verify krna hai
        {
            req.admin=jwt.verify(token,secret_key); //data nikalo payload wala
            next();
        }
        catch(e)
        {
            res.json({error:true,message:'Unautherized Access'});
        }
    }
}

//login admin
adminRouter.get('/login',adminController.loginPage);
adminRouter.post('/login',adminController.loginAdmin);

//add admin
adminRouter.get('/fetchadmin',AuthorizeAdmin_HTTP,adminController.fetchAdmin);
adminRouter.get('/manage_admin',AuthorizeAdmin_HTTP,adminController.renderManageAdmin);
adminRouter.post('/addAdmin',AuthorizeAdmin_HTTP,adminController.addAdmin);
adminRouter.get('/fetchAlladmin',AuthorizeAdmin_HTTP,adminController.fetchAllAdmin);
adminRouter.delete('/delete_admin/:id',AuthorizeAdmin_HTTP,adminController.deleteAdmin);
//render dashboard
adminRouter.get('/dashboard',AuthorizeAdmin_HTTP,adminController.renderDashboard);

//manage driver
adminRouter.get('/manage_driver',AuthorizeAdmin_HTTP,adminController.renderDriverPage);
adminRouter.post('/add_driver',AuthorizeAdmin_HTTP,adminController.addDriver);
adminRouter.get('/viewDriver',AuthorizeAdmin_HTTP,adminController.viewDriver);
adminRouter.delete('/delete_driver/:id',AuthorizeAdmin_HTTP,adminController.deleteDriver);
//manage dealer
adminRouter.get('/manage_dealer',AuthorizeAdmin,adminController.renderDealersPage);
adminRouter.get('/fetchDealers',AuthorizeAdmin_HTTP,adminController.fetchDealers);
adminRouter.put('/update_dealerstatus/:id',AuthorizeAdmin_HTTP,adminController.updateDealerStatus);
adminRouter.delete('/delete_dealer/:id',AuthorizeAdmin_HTTP,adminController.deleteDealer);
//send email
adminRouter.post('/send-email',AuthorizeAdmin_HTTP, adminController.sendEmail);
adminRouter.post('/send_email_admin',AuthorizeAdmin_HTTP, adminController.sendEmailAdmin);
//manage category
adminRouter.get('/manage_category',AuthorizeAdmin,adminController.renderManageCategory);
adminRouter.post('/add_category',AuthorizeAdmin_HTTP,adminController.addCategory);
adminRouter.get('/viewcategory',AuthorizeAdmin_HTTP,adminController.viewCategory);
adminRouter.delete('/delete_category/:id',AuthorizeAdmin_HTTP,adminController.deleteCategory);

//change password
adminRouter.get('/changePassword',AuthorizeAdmin_HTTP,adminController.changePassword);
//fetch passsword
adminRouter.put('/changePassword',AuthorizeAdmin_HTTP,adminController.updatePassword);
adminRouter.get('/logout',AuthorizeAdmin_HTTP,adminController.logout);

//view bookings
adminRouter.get('/view_booking',AuthorizeAdmin,adminController.renderBooking);
adminRouter.get('/fetchbooking',AuthorizeAdmin_HTTP,adminController.fetchBookings);

//route
adminRouter.get('/verify-token', adminController.verifyToken)
module.exports = adminRouter;