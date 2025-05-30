var express = require('express');
var fileUpload = require('express-fileupload');
var cors=require("cors");
var app = express();


//require jwt token
//var jwt=require('jsonwebtoken');
//var jwt_secret="abcd@#$&1234";
var db = require('./db.config');
//require cookie-parser
var cookieParser = require('cookie-parser');

app.use(fileUpload());
app.use(cors());
// adding index.js routes in file
var indexRouter = require('./routes/index');

app.use("/", indexRouter);

var adminRouter = require('./routes/admin');
app.use("/admin", adminRouter);

var userRouter = require('./routes/user');
app.use("/user", userRouter);

var dealerRouter=require('./routes/dealer');
app.use('/dealer',dealerRouter);

//adding connection js.file
var connection = require('./connection');

// using view engine ejs
app.set("view engine", "ejs");
// we use static files
app.use(express.static('public'));
app.use(cookieParser());
//post ka object get krne ke liye
app.use(express.json());
//post method wala object get krne ke liye
app.use(express.urlencoded({extended: true}));

//it is used to build connection with database
db.sequelize.sync();


var port = 3001;
app.listen(port, (error) => {
    if (error) {
        console.log(error.message);
    } else {
        console.log("server is running on port " + port);
    }
});


