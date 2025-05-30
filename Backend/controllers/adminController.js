var connection=require("../connection");
//getting the model for inserting the data
var db=require("../db.config");
const e = require("express");

var adminController={};
//to use in operator
var {Op}=require("sequelize");
var jwt=require('jsonwebtoken');
//for email sending
var nodemailer = require('nodemailer');

var secret_key='abcd#$%@12345678';
//making function to call in admin.js route directly
//adding data too the table
var AdminModel=db.admin;
var DealerModel=db.dealer;
var categoryModel=db.category;
var bookingModel=db.booking;
var vehicleModel=db.vehicle;
var userModel=db.user;
var driverModel=db.driver;

adminController.loginPage=(req,res)=>
{
    res.render('admin/login');
}
adminController.loginAdmin=async (req,res)=>
{
    try
    {
        var {email, password} = req.body;
        var result=await AdminModel.findAll({
            where:
                {
                    email:email,
                    password:password
                }
        });
        //console.log(result.length);
        if(result.length>0)
        {
            var payload={
                id:result[0].id,
                email:result[0].email,
                name:result[0].name,
                type:result[0].type
            }
            var token=jwt.sign(payload,secret_key,{expiresIn:'1D'});
            // res.cookie('AdminToken',token);
            res.json({error:false,message:"Login Successful",token:token});
        }
        else
        {
            res.json({error: true, message: "Wrong Email or Password"});
        }
    }
    catch (e)
    {
        res.json({error:true,message:e.message});
    }
}
adminController.fetchAdmin=async (req,res)=>
{
    try
    {
        var {id}=req.admin;
        var records=await AdminModel.findAll({where:{id:id}});
        res.json({error:false,records:records});
    }
    catch (e)
    {
        res.json({error:true,records:[]});
    }
}
adminController.renderManageAdmin=(req,res)=>
{
    res.render('admin/manage_admin');
}
adminController.addAdmin=async (req,res)=>
{
    try
    {
        await AdminModel.create(req.body);
        res.json({error:false,message:"New Admin Added SuccessFully"});
    }
    catch (e)
    {
        res.json({error:true,message:e.message});
    }
}
adminController.fetchAllAdmin=async (req,res)=>
{
    try
    {
        var {type}=req.admin;
        var records=await AdminModel.findAll();
        res.json({error:false,records:records,type:type});
    }
    catch (e)
    {
        res.json({error:true,records:[],type:type});
    }
}
adminController.deleteAdmin=async (req,res)=>
{
    try
    {
        var {id}=req.params;
        var record=await AdminModel.destroy({where:{id:id}});
        res.json({error:false,message:"Data Deleted SuccessFully"});
    }
    catch (e)
    {
        res.json({error:true,message:e.message});
    }
}
adminController.renderDashboard=(req,res)=>
{
    res.render('admin/dashboard');
}
adminController.renderDriverPage=(req,res)=>
{
    res.render('admin/manage_driver');
}
adminController.addDriver=async (req,res)=>
{

        var {photo} = req.files;
        var server_path = `public/driverPic/${photo.name}`;
        var db_path = `/driverPic/${photo.name}`;
        photo.mv(server_path, async (error) => {
            if (error) {
                res.json({error: true, message: error.message});
            }
            else {
                try {
                    req.body.photo = db_path;
                    await driverModel.create(req.body);
                    res.json({error: false, message: "Driver Added Successfully"});
                } catch (e) {
                    res.json({error: true, message: e.message});
                }
            }
        });
}
adminController.viewDriver=async (req,res)=>
{
    try
    {
        var records = await driverModel.findAll();
        //console.log(records);
        res.json({error:false,records:records});
    }
    catch (e)
    {
        res.json({error:true,records:[]});
    }
}
adminController.deleteDriver=async (req,res)=>
{
    try
    {
        var {id}=req.params;
        var record=await driverModel.destroy({where:{id:id}});
        res.json({error:false,message:"Data Deleted SuccessFully"});
    }
    catch (e)
    {
        res.json({error:true,message:e.message});
    }
}
adminController.renderDealersPage=(req,res)=>
{
    res.render('admin/manage_dealer');
}
adminController.fetchDealers = async (req,res)=>
{
    try
    {
        var records=await DealerModel.findAll();
        res.json({error:false,records:records});
    }
    catch (e)
    {
        res.json({error:true,records:[]});
    }
}
adminController.updateDealerStatus=async (req,res)=>
{
    try
    {
        var {id}=req.params;
        await DealerModel.update(req.body,{where:{id:id}});
        res.json({error:false,message:"Data Updated SuccessFully"});
    }
    catch (e)
    {
        res.json({error:true,message:e.message});
    }
}
adminController.deleteDealer=async (req,res)=>
{
    try
    {
        var {id}=req.params;
        var record=await DealerModel.destroy({where:{id:id}});
        res.json({error:false,message:"Data Deleted SuccessFully"});
    }
    catch (e)
    {
        res.json({error:true,message:e.message});
    }
}
adminController.sendEmail = async (req, res) => {
    try {
        var {email,status,name} = req.body;
        var transporter = nodemailer.createTransport({
            service: 'gmail', // You can use other services like Outlook, Yahoo, etc.
            auth: {
                user: 'dummymail2003s@gmail.com', // Your email address
                pass: 'uevludqlpergxtje', // uevludqlpergxtje
            },
        });
        // Email options
        const mailOptions = {
            from: 'dummymail2003s@gmail.com', // Sender's email
            to: email, // Receiver's email
            subject: 'Subject: Your KYC Verification Request Has Been '+status,
            // text: 'This is a test email sent using Nodemailer.',
            html: `<h1>Dear ${name}</h1>
This is to inform you that Your KYC Verification Status For DealerShip at NovaRide  has been ${status} If you have any questions or need further assistance, feel free to contact our support team. Thank you for shopping with us—we appreciate your trust and look forward to serving you again!
<h4>
Best regards,</h4>
<h4>
NovaRide
</h4>`, // HTML body

        };
        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                //console.log('Error occurred:', error);
                res.json({error: true, message: error.message});
            } else {
                //console.log('Email sent:', info.response);
                res.json({error:false, message: "E-Mail Sent Successfully"});
            }
        });
    } catch (e) {
        res.json({error: true, message: e.message});
    }
}
adminController.sendEmailAdmin = async (req, res) => {
    try {
        var {email,name,password} = req.body;
        var transporter = nodemailer.createTransport({
            service: 'gmail', // You can use other services like Outlook, Yahoo, etc.
            auth: {
                user: 'dummymail2003s@gmail.com', // Your email address
                pass: 'uevludqlpergxtje', // uevludqlpergxtje
            },
        });
        // Email options
        const mailOptions = {
            from: 'dummymail2003s@gmail.com', // Sender's email
            to: email, // Receiver's email
            subject: 'Subject: Credentials For Login As Admin ',
            // text: 'This is a test email sent using Nodemailer.',
            html: `<h1>Dear ${name}</h1>
<h3>Your Credentials for Login are:-<h3>
<div>
Email:- ${email}</div>
<div>
Password:-${password}
</div>
</h3>
<h4>
Best regards,</h4>
<h4>
NovaRide
</h4>`, // HTML body

        };
        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                //console.log('Error occurred:', error);
                res.json({error: true, message: error.message});
            } else {
                //console.log('Email sent:', info.response);
                res.json({error:false, message: "E-Mail Sent Successfully"});
            }
        });
    } catch (e) {
        res.json({error: true, message: e.message});
    }
}
adminController.renderManageCategory=(req,res)=>
{
    res.render("admin/manage_category");
}
adminController.addCategory=async (req,res)=>
{
    var {name} = req.body;
    var result = await categoryModel.findAll({where: {name: name}});
    if (result.length == 0) {
        var {photo} = req.files;
        var server_path = `public/categoryPic/${photo.name}`;
        var db_path = `/categoryPic/${photo.name}`;
        photo.mv(server_path, async (error) => {
            if (error) {
                res.json({error: true, message: error.message});
            }
            else {
                try {
                    req.body.photo = db_path;
                    await categoryModel.create(req.body);
                    res.json({error: false, message: "Category Created Successfully"});
                } catch (e) {
                    res.json({error: true, message: e.message});
                }
            }
        });
    } else {
        res.json({error: true, message: "Category Already Exists"});
    }
}
adminController.viewCategory=async (req,res)=>
{
    try
    {
        var records = await categoryModel.findAll();
        //console.log(records);
        res.json({error:false,records:records});
    }
    catch (e)
    {
        res.json({error:true,records:[]});
    }
}
adminController.deleteCategory=async (req,res)=>
{
    try
    {
        var {id}=req.params;
        var record=await categoryModel.destroy({where:{id:id}});
        res.json({error:false,message:"Data Deleted SuccessFully"});
    }
    catch (e)
    {
        res.json({error:true,message:e.message});
    }
}
//change password
adminController.changePassword=async (req,res)=>
{
    res.render('admin/changePassword');
}
adminController.updatePassword=async (req,res)=>
{
    try
    {
        var {id}=req.admin;
        var {password,new_password}=req.body;
        var records=await AdminModel.findAll({where:{id:id,password:password}});
        if(records.length>0)
        {
            await AdminModel.update({password:new_password}, {where: {id: id}});
            //console.log(records);
            res.json({error: false, message: "Password Updated SuccessFully"});
        }
        else
        {
            res.json({error:true,message:"Invalid Password"});
        }
    }
    catch (e)
    {
        res.json({error:true,message:e.message});
    }
}
adminController.logout=(req,res)=>
{
    res.clearCookie('AdminToken');
    res.redirect('/admin/login');
}
adminController.renderBooking=(req,res)=>
{
    res.render("admin/view_bookings");
}
adminController.fetchBookings = async (req, res) => {
    var records = await bookingModel.findAll({
        include:[
            {
                model:vehicleModel,
                attributes:['name','car_photo','vehicle_model']
            },
            {
                model:userModel,
                attributes:['first_name','last_name','email']
            },
            {
                model:DealerModel,
                attributes:['name']
            }
        ]
    });
    if (records.length > 0) {
        res.json({error: false, records: records});
    } else {
        res.json({error: true, records: []});
    }
}
adminController.verifyToken = (req, res) => {
    const token = req.headers.authorization.split(" ")[1]

    if (token) {
        try {
            let AdminData = jwt.verify(token, secret_key); // Verify Token
            res.json({error: false, message: 'Authorized', AdminData: AdminData});
        } catch (error) {
            res.json({error: true, message: 'Unauthorized'});
        }
    } else 
    {
        res.json({error: true, message: 'Unauthorized'});
    }
}
module.exports = adminController;
