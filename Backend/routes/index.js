var express = require('express');
var router = express.Router();
router.use(express.json());
//post method wala object get krne ke liye
router.use(express.urlencoded({extended: true}));


var indexcontroller = require('../controllers/indexController');
const userController = require("../controllers/userController");
const dealerController = require("../controllers/dealerController");

router.get('/',indexcontroller.renderIndexPage);
router.get('/fetchCategories',indexcontroller.fetchCategories);
router.get('/vehicles/:id',indexcontroller.renderVehicle);
router.get('/fetchvehicle/:id',indexcontroller.fetchVehicles);

router.get('/about',indexcontroller.renderAboutPage);
router.get('/contact',indexcontroller.renderContactPage);

//fetch reviews
router.get('/fetchreviews',indexcontroller.fetchReviews);

//single vehicle
router.get('/single_veh/:id',indexcontroller.renderSingleVehicle);
router.get('/fetchSingle/:id',indexcontroller.fetchSingleVehicle);

router.get('/fetchreviews/:id',indexcontroller.fetchReviewsById);
module.exports = router;