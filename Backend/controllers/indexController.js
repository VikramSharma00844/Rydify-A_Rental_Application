var indexController = {};
var db = require("../db.config");
const jwt = require("jsonwebtoken");

var nodemailer = require('nodemailer');
var categoryModel=db.category;
var vehicleModel=db.vehicle;
var reviewModel=db.review;
var userModel=db.user;
var dealerModel=db.dealer;

indexController.renderIndexPage=(req,res)=>
{
    res.render('index')
}
indexController.fetchCategories=async (req,res)=>
{
    try
    {
        var records = await categoryModel.findAll();
        res.json({error:false,records:records});
    }
    catch (e)
    {
        res.json({error:true,records:[]});
    }
}
indexController.renderVehicle=(req,res)=>
{
    var id=req.params.id;
    res.render('vehicles',{id:id});
}
indexController.fetchVehicles=async (req,res)=>
{
    try
    {
        var {id}=req.params;
        var records;
        if(id=='all')
        {
             records = await vehicleModel.findAll({
                 where:{status:'Available'},
                 include:[{
                     model:categoryModel,
                     attributes:['name']
                 }]
             });
        }
        else
        {
            records = await vehicleModel.findAll({where:{categoryId:id,status:'Available'},
                include:[{
                    model:categoryModel,
                    attributes:['name']
                }]
            });
        }
        res.json({error:false,records:records});
    }
    catch (e)
    {
        res.json({error:true,records:[]});
    }
}
indexController.renderAboutPage=(req,res)=>
{
    res.render('about')
}
indexController.renderContactPage=(req,res)=>
{
    res.render('contact')
}
indexController.fetchReviews=async (req,res)=>
{
    try
    {
        var records = await reviewModel.findAll({
            include:[
                {
                    model:userModel,
                    attributes:['first_name','last_name','photo']
                },
                {
                    model:vehicleModel,
                    attributes:['name','car_photo','vehicle_model']
                },

            ]
            });
        res.json({error:false,records:records});
    }
    catch (e)
    {
        res.json({error:true,records:[]});
    }
}
indexController.renderSingleVehicle=(req,res)=>
{
    res.render('single_Vehicle',{id:req.params.id});
}
indexController.fetchSingleVehicle=async (req,res)=>
{
    try
    {
        var records = await vehicleModel.findByPk(req.params.id);
        res.json({error:false,records:records});
    }
    catch (e)
    {
        res.json({error:true,records:[]});
    }
}
indexController.fetchReviewsById=async (req,res)=>
{
    try
    {
        var records = await reviewModel.findAll({
            where:{vehicleId:req.params.id},
            include:[
                {
                    model:userModel,
                    attributes:['first_name','last_name','photo']
                },
                {
                    model:vehicleModel,
                    attributes:['name','car_photo','vehicle_model']
                },

            ]
        });
        res.json({error:false,records:records});
    }
    catch (e)
    {
        res.json({error:true,records:[]});
    }
}
module.exports = indexController;