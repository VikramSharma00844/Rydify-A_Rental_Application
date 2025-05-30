var dealerController = {};
var db = require("../db.config");
const jwt = require("jsonwebtoken");
var secret_key = 'abcd#$%@12345678';

var nodemailer = require('nodemailer');

var dealerModel=db.dealer;
var categoryModel=db.category;
var vehicleModel=db.vehicle;
var bookingModel=db.booking;
var userModel=db.user;
var driverModel=db.driver;
var extrafair=db.extrafair;

dealerController.RenderSignup=(req,res)=>
{
    res.render("dealer/signup");
}
dealerController.RenderLogin=(req,res)=>
{
    res.render("dealer/login");
}
dealerController.registerDealer = async (req, res) => {
    var {email} = req.body;
    var result = await dealerModel.findAll({where: {email: email}});
    if (result.length == 0) {
        var {photo} = req.files;
        var server_path = `public/dealersPic/${photo.name}`;
        var db_path = `/dealersPic/${photo.name}`;
        photo.mv(server_path, async (error) => {
            if (error) {
                res.json({error: true, message: error.message});
            } else {
                try {
                    req.body.photo = db_path;
                    await dealerModel.create(req.body);
                    res.json({error: false, message: "Dealer added Successfully"});
                } catch (e) {
                    res.json({error: true, message: e.message});
                }
            }
        });
    } else {
        res.json({error: true, message: "Dealer Already Exists"});
    }
}
dealerController.loginDealer = async (req, res) => {
    try {
        var {email, password} = req.body;
        var result = await dealerModel.findAll({
            where:
                {
                    email: email,
                    password: password
                }
        });
        //console.log(result.length);
        if (result.length == 1) {
            //agar status active hai toh hi usersPic login  kr skta hai
            var result2 = await dealerModel.findAll({where: {email: email, status: 'Active'}});
            //seedha result se status bhi nikal skte hai result[0].status krke
            if (result2.length > 0) {
                //console.log(result[0].email);
                var payload = {
                    id: result[0].id,
                    email: result[0].email,
                    name: result[0].name
                }
                var token = jwt.sign(payload, secret_key, {expiresIn: '1D'});
                // res.cookie('DealerToken', token);
                res.json({error: false, message: "Login Successfull",token:token});
            } else {
                res.json({error: true, message: "KYC DETAILS ARE UNDER PROCESS ,PLEASE TRY AGAIN AFTER SOME TIME"});
            }
        } else {
            res.json({error: true, message: "Invalid Cridentails"});
        }
        // res.json({error:true,message:""});
    } catch (e) {
        res.json({error: true, message: e.message});
    }
}
dealerController.CheckToken=(req,res)=>
{
    // console.log(req.cookies);
    if(req.cookies.DealerToken)
    {
        res.json({error:false});
    }
    else
    {
        res.json({error:true});
    }
}
dealerController.renderDashboard=(req,res)=>
{
    res.render("dealer/dashboard");
}

dealerController.renderManageVehicle=(req,res)=>
{
    res.render("dealer/manage_vehicle");
}
dealerController.fetchCategories=async (req,res)=>
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
dealerController.fetchCategory=async (req,res)=>
{
    try
    {
        var records = await categoryModel.findAll({where:{id:req.params.id}});
        //console.log(records);
        res.json({error:false,records:records});
    }
    catch (e)
    {
        res.json({error:true,records:[]});
    }
}
dealerController.addVehicle = async (req, res) =>
{
    try
    {
        req.body.dealerId=req.dealer.id;
        var {rc,insurance,pollution,car} = req.files;

        var server_path1 = `public/veh_documents/${car.name}`;
        var db_path1 = `/veh_documents/${car.name}`;
        car.mv(server_path1, async (error) =>
        {
            if (error) {
                res.json({error: true, message: error.message});
            }

        });
        var server_path = `public/veh_documents/${rc.name}`;
        var db_path = `/veh_documents/${rc.name}`;
        rc.mv(server_path, async (error) =>
        {
            if (error) {
                res.json({error: true, message: error.message});
            }

        });
        var server_path2 = `public/veh_documents/${insurance.name}`;
        var db_path2 = `/veh_documents/${insurance.name}`;
        insurance.mv(server_path2, async (error) =>
        {
            if (error) {
                res.json({error: true, message: error.message});
            }
        });
    var server_path3 = `public/veh_documents/${pollution.name}`;
    var db_path3 = `/veh_documents/${pollution.name}`;
    pollution.mv(server_path3, async (error) =>
    {
        if (error)
        {
            res.json({error: true, message: error.message});
        }
    });
        req.body.car_photo = db_path1;
        req.body.rc = db_path;
        req.body.insurance = db_path2;
        req.body.pollution = db_path3;
        await vehicleModel.create(req.body);
        res.json({error: false, message: "Vehicle created successfully"});
    }
    catch (e)
    {
        res.json({error:true,message:e.message});
    }

}
dealerController.fetchMyVehicle=async (req,res)=>
{
    try
    {
        var records = await vehicleModel.findAll({where:{dealerId:req.dealer.id},
        include:[{
            model:categoryModel,
            attributes:['name']
        }
        ]});
        //console.log(records);
        res.json({error:false,records:records});
    }
    catch (e)
    {
        res.json({error:true,records:[]});
    }
}
dealerController.deleteVehicle=async (req,res)=>
{
    try
    {
        var {id}=req.params;
        var record=await vehicleModel.destroy({where:{id:id}});
        res.json({error:false,message:"Data Deleted SuccessFully"});
    }
    catch (e)
    {
        res.json({error:true,message:e.message});
    }
}
dealerController.logoutUser = (req, res) => {
    res.clearCookie('DealerToken');
    res.redirect('/dealer/login');
}
dealerController.renderProfile = (req, res) => {
    res.render('dealer/profile');
}
dealerController.showProfile = async (req, res) => {
    var {id} = req.dealer;
    var records = await dealerModel.findAll({where: {id: id}});
    if (records.length > 0) {
        res.json({error: false, records: records});
    } else {
        res.json({error: true, records: []});
    }
}
dealerController.updateProfile = async (req, res) => {
    try {
        var {id} = req.params;

        var {photo} = req.files;
        var server_path = `public/dealersPic/${photo.name}`;
        var db_path = `/dealersPic/${photo.name}`;
        photo.mv(server_path, async (error) => {
            if (error) {
                res.json({error: true, message: error.message});
            } else {
                try {
                    req.body.photo = db_path;
                    await dealerModel.update(req.body, {where: {id: id}});
                    res.json({error: false, message: "Details Updated Successfully"});
                } catch (e) {
                    res.json({error: true, message: e.message});
                }
            }
        });
    } catch (e) {
        res.json({error: true, message: e.message});
    }
}
dealerController.updateProfile2 = async (req, res) => {
    try {
        var {id} = req.params;
        await dealerModel.update(req.body, {where: {id: id}});
        res.json({error: false, message: "Details Updated SuccessFully"});
    } catch (e) {
        res.json({error: true, message: e.message});
    }
}
dealerController.changePassword = async (req, res) => {
    res.render('dealer/changePassword');
}

dealerController.updatePassword = async (req, res) => {
    try {
        var {id} = req.dealer;
        var {password, new_password} = req.body;
        var records = await dealerModel.findAll({where: {id: id, password: password}});
        if (records.length > 0) {
            await dealerModel.update({password: new_password}, {where: {id: id}});
            //console.log(records);
            res.json({error: false, message: "Password Updated SuccessFully"});
        } else {
            res.json({error: true, message: "Invalid Password"});
        }
    } catch (e) {
        res.json({error: true, message: e.message});
    }
}
dealerController.renderBookingReq = (req, res) => {
    res.render('dealer/manage_booking_request');
}
dealerController.fetchBookings = async (req, res) => {
    var {id} = req.dealer;
    var records = await bookingModel.findAll({where: {dealerId: id,booking_status:'Pending'},
    include:[
        {
            model:vehicleModel,
            attributes:['name','car_photo']
        },
        {
            model:userModel,
            attributes:['first_name','last_name','email']
        }
        ]
    });
    if (records.length > 0) {
        res.json({error: false, records: records});
    } else {
        res.json({error: true, records: []});
    }
}
dealerController.UpdateBookings = async (req, res) => {
    try {
            var {id} = req.params;
            await bookingModel.update(req.body, {where: {id: id}});
            //console.log(records);
            res.json({error: false, message: "Booking Status Updated SuccessFully"});
    }
    catch (e)
    {
        res.json({error: true, message: e.message});
    }
}
dealerController.updateDriver = async (req, res) => {
    try {
        var {id} = req.params;
        await driverModel.update(req.body, {where: {id: id}});
        //console.log(records);
        res.json({error: false, message: "Booking Status Updated SuccessFully"});
    }
    catch (e)
    {
        res.json({error: true, message: e.message});
    }
}
dealerController.sendEmail = async (req, res) => {
    try {
        var {email,vehiclecategory,status,name} = req.body;
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
            subject: `Subject: Your ${vehiclecategory} Request Has Been ${status}`,
            // text: 'This is a test email sent using Nodemailer.',
            html: `<h1>Dear ${name}</h1>
This is to inform you that Your Vehicle Booking Status for ${vehiclecategory} at NovaRide  has been ${status} If you have any questions or need further assistance, feel free to contact our support team. Thank you for Choosing us—we appreciate your trust and look forward to serving you again!
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
dealerController.renderApprovedReq = (req, res) => {
    res.render('dealer/manage_approve_req');
}
dealerController.fetchApprovedReq = async (req, res) => {
    var {id} = req.dealer;
    var records = await bookingModel.findAll({where: {dealerId: id,booking_status:'Approved'},
        include:[
            {
                model:vehicleModel,
                attributes:['name','car_photo']
            },
            {
                model:userModel,
                attributes:['first_name','last_name','email']
            }
        ]
    });
    if (records.length > 0) {
        res.json({error: false, records: records});
    } else {
        res.json({error: true, records: []});
    }
}
dealerController.updateVehicle=async (req,res)=>
{
    try
    {
        var {id}=req.params;
        var result=await vehicleModel.update(req.body,{where:{id:id}});
        if(result[0]==1)
        {
            res.json({error: false, message: "data updated SuccessFully"});
        }
        else
        {
            res.json({error:true,message:"Invalid Id"});
        }
    }
    catch (e)
    {
        res.json({error:true,message:e.message});
    }
}

dealerController.renderCancelledReq = (req, res) => {
    res.render('dealer/view_cancelled_req');
}
dealerController.fetchCancelledReq = async (req, res) => {
    var {id} = req.dealer;
    var records = await bookingModel.findAll({where: {dealerId: id,booking_status:'Cancelled'},
        include:[
            {
                model:vehicleModel,
                attributes:['name','car_photo']
            },
            {
                model:userModel,
                attributes:['first_name','last_name','email']
            }
        ]
    });
    if (records.length > 0) {
        res.json({error: false, records: records});
    } else {
        res.json({error: true, records: []});
    }
}
dealerController.renderCompletedReq = (req, res) => {
    res.render('dealer/view_completed_req');
}
dealerController.fetchCompletedReq = async (req, res) => {
    var {id} = req.dealer;
    var records = await bookingModel.findAll({where: {dealerId: id,booking_status:'Completed'},
        include:[
            {
                model:vehicleModel,
                attributes:['name','car_photo']
            },
            {
                model:userModel,
                attributes:['first_name','last_name','email']
            }
        ]
    });
    if (records.length > 0) {
        res.json({error: false, records: records});
    } else {
        res.json({error: true, records: []});
    }
}
dealerController.verifyToken = (req, res) => {
    const token = req.headers.authorization.split(" ")[1]

    if (token) 
    {
        try 
        {
            let DealerData = jwt.verify(token, secret_key); // Verify Token
            res.json({error: false, message: 'Authorized', DealerData: DealerData});
        } 
        catch (error) 
        {
            res.json({error: true, message: 'Unauthorized'});
        }
    } 
    else 
    {
        res.json({error: true, message: 'Unauthorized'});
    }
}

dealerController.addfare=async (req,res)=>
{
    try
    {
        await extrafair.create(req.body);
        res.json({error:false,message:"Fare Added SuccessFully"});
    }
    catch (e)
    {
        res.json({error:true,message:e.message});
    }
}


module.exports = dealerController;