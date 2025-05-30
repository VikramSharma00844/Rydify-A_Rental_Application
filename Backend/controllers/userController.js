var jwt = require('jsonwebtoken');
var secret_key = 'abcd#$%@12345678';
var db = require('../db.config');

var {Op}=require("sequelize");

var userController = {};

var usermodel=db.user;
var vehicleModel=db.vehicle;
var bookingModel=db.booking;
var userModel=db.user;
var DealerModel=db.dealer;
var reviewModel=db.review;
var driverModel=db.driver;
var extrafair=db.extrafair;


userController.renderSignUpPage=(req,res)=>
{
    res.render('user/signup');
}
userController.renderLoginPage=(req,res)=>
{
    res.render('user/login');
}
//register usersPic and login usersPic
userController.registerUser = async (req, res) => {
    var {email} = req.body;
    var result = await usermodel.findAll({where: {email: email}});
    if (result.length == 0) {
        var {photo} = req.files;
        var server_path = `public/usersPic/${photo.name}`;
        var db_path = `/usersPic/${photo.name}`;
        photo.mv(server_path, async (error) => {
            if (error) {
                res.json({error: true, message: error.message});
            } else {
                try {
                    req.body.photo = db_path;
                    await usermodel.create(req.body);
                    res.json({error: false, message: "User added Successfully"});
                } catch (e) {
                    res.json({error: true, message: e.message});
                }
            }
        });
    } else {
        res.json({error: true, message: "User Already Exists"});
    }
}
userController.loginUser = async (req, res) => {
    try {
        var {email, password} = req.body;
        var result = await usermodel.findAll({
            where:
                {
                    email: email,
                    password: password
                }
        });
        //console.log(result.length);
        if (result.length == 1) {
            //agar status active hai toh hi usersPic login  kr skta hai
            var result2 = await usermodel.findAll({where: {email: email, status: 'Active'}});
            //seedha result se status bhi nikal skte hai result[0].status krke
            if (result2.length > 0) {
                //console.log(result[0].email);
                var payload = {
                    id: result[0].id,
                    email: result[0].email,
                    name: result[0].first_name
                }
                var token = jwt.sign(payload, secret_key, {expiresIn: '1D'});
                // res.cookie('UserToken', token);
                res.json({error: false, message: "Login Successfull",token:token});
            } else {
                res.json({error: true, message: "User Blocked By Admin , Please Contact Admin To Unblock"});
            }
        } else {
            res.json({error: true, message: "Invalid Cridentails"});
        }
        // res.json({error:true,message:""});
    } catch (e) {
        res.json({error: true, message: e.message});
    }
}
userController.checkToken= (req,res)=>
{
    if(req.cookies.UserToken)
    {
        res.json({error:false});
    }
    else
    {
        res.json({error:true});
    }
}
userController.renderDashBoard = (req, res) => {
    res.render('user/dashboard',{name:req.user.name});
}
userController.renderBooking = (req, res) => {
    res.render('user/booking',{vehicleId:req.params.id});
}
userController.fetchVehicles=async (req,res)=>
{
    try {
        var records = await vehicleModel.findAll({where: {id: req.params.id}});
        res.json({error:false,records:records});
    }
    catch (e) {
        res.json({error:true,records:[]});
    }
}
userController.BookVehicle=async (req,res)=>
{
    try
    {
        var {driving_licence} = req.files;
        req.body.userId=req.user.id;
        var server_path = `public/userDL/${driving_licence.name}`;
        var db_path = `/userDL/${driving_licence.name}`;
        driving_licence.mv(server_path, async (error) => {
            if (error)
            {
                res.json({error: true, message: error.message});
            }
            else
            {
                req.body.driving_licence = db_path;
            }
            await bookingModel.create(req.body);
            res.json({error:false,message:"Car Booked SuccessFully"});
        });
    }
    catch (e)
    {
        res.json({error:true,message:e.message});
    }
}
userController.updateVehicle=async (req,res)=>
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
userController.updateDriver=async (req,res)=>
{
    try
    {
        var {id}=req.params;
        var result=await driverModel.update(req.body,{where:{id:id}});
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
userController.thankyou= (req,res)=>
{
    res.render('user/thankyou');
}
userController.logoutUser = (req, res) => {
    res.clearCookie('UserToken');
    res.redirect('/user/login');
}
userController.renderProfile = (req, res) => {
    res.render('user/profile');
}
userController.showProfile = async (req, res) => {
    var {id} = req.user;
    var records = await usermodel.findAll({where: {id: id}});
    if (records.length > 0) {
        res.json({error: false, records: records});
    } else {
        res.json({error: true, records: []});
    }
}
userController.updateProfile = async (req, res) => {
    try {
        var {id} = req.params;

        var {photo} = req.files;
        var server_path = `public/usersPic/${photo.name}`;
        var db_path = `/usersPic/${photo.name}`;
        photo.mv(server_path, async (error) => {
            if (error) {
                res.json({error: true, message: error.message});
            } else {
                try {
                    req.body.photo = db_path;
                    await usermodel.update(req.body, {where: {id: id}});
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
userController.updateProfile2 = async (req, res) => {
    try {
        var {id} = req.params;
        console.log("inside profile");
        
        await usermodel.update(req.body, {where: {id: id}});
        res.json({error: false, message: "Details Updated SuccessFully"});
    } catch (e) {
        res.json({error: true, message: e.message});
    }
}
userController.changePassword = async (req, res) => {
    res.render('user/changePassword');
}

userController.updatePassword = async (req, res) => {
    try {
        var {id} = req.user;
        var {old_password, new_password} = req.body;
        
        
        var records = await usermodel.findAll({where: {id: id, password: old_password}});
        if (records.length > 0) {
            await usermodel.update({password: new_password}, {where: {id: id}});
            //console.log(records);
            res.json({error: false, message: "Password Updated SuccessFully"});
        } else {
            res.json({error: true, message: "Invalid Password"});
        }
    } catch (e) {
        res.json({error: true, message: e.message});
    }
}

userController.renderMyBooking=(req,res)=>
{
    res.render("user/mybookings");
}
userController.fetchMyBookings = async (req, res) =>
{
    var userId=req.user.id;
    var records = await bookingModel.findAll({
        where:{userId:userId},
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

userController.addReview=async (req,res)=>
{
    try
    {
        // var {packageId,feedback,rating}=req.body;
        // console.log(packageId,feedback,rating);
        // console.log(req.user.id);
        req.body.userId=req.user.id;
        await reviewModel.create(req.body);
        res.json({error:false,message:"Review Added SuccessFully"});
    }
    catch (e)
    {
        res.json({error:true,message:e.message});
    }
}
userController.fetchDriver=async (req,res)=>
{
    try
    {
        var records=await driverModel.findAll({where:{status:'Available'}});
        res.json({error:false,records:records});
    }
    catch(e)
    {
        res.json({error:true,records:[]});
    }
}

userController.verifyToken = (req, res) => {
    const token = req.headers.authorization.split(" ")[1]

    if (token) {
        try {
            let userData = jwt.verify(token, secret_key); // Verify Token
            res.json({error: false, message: 'Authorized', userData: userData});
        } catch (error) {
            res.json({error: true, message: 'Unauthorized'});
        }
    } else {
        res.json({error: true, message: 'Unauthorized'});

    }
}
userController.FetchMyFair=async (req,res)=>
{
    try
    {

        var {id}=req.params;
        var records=await extrafair.findAll({where:{bookingId:id}});
        res.json({error:false,message:"Data Fetched SuccessFully",records:records});
    }
    catch (e)
    {
        res.json({error:true,message:e.message,records:[]});
    }

}

userController.contactHandler=(req,res)=>{
    let first_name=req.body.first_name;
    let last_name=req.body.last_name;
    let email=req.body.email;
    let phone=req.body.phone;
    let address=req.body.address;

    const values=[first_name,last_name,email,phone,address];

    let insertQuery="insert into contacts(first_name,last_name,email,phone,address) values(?,?,?,?,?);"
    connection.create(insertQuery,values,(error)=>{
        if(error){
            res.json({error:true,message:error.message})
        }
        else{
            res.json({error:false,message:"Contact added Successfully"})
        }
    })
}


module.exports = userController;