var Sequelize = require("sequelize");
var dbName = 'rydify2'; //database name
var dbUser = 'root';
var dbPassword = 'system';

var sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
});

var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* MODELS */
//admin
db.admin=require('./models/admin')(sequelize,Sequelize);
//user
db.user=require('./models/user')(sequelize,Sequelize);
//dealer
db.dealer=require('./models/dealer')(sequelize,Sequelize);
//category
db.category=require('./models/category')(sequelize,Sequelize);

//vehicle
db.vehicle=require('./models/vehicle')(sequelize,Sequelize);
db.extrafair=require('./models/extrafair')(sequelize,Sequelize);

//foreign key
db.category.hasMany(db.vehicle,{foreignKey:'categoryId'});
db.vehicle.belongsTo(db.category);

db.dealer.hasMany(db.vehicle,{foreignKey:'dealerId'});
db.vehicle.belongsTo(db.dealer);

//bookings
db.booking=require('./models/booking')(sequelize,Sequelize);
db.user.hasMany(db.booking, { foreignKey: 'userId' });
db.booking.belongsTo(db.user);


db.dealer.hasMany(db.booking, { foreignKey: 'dealerId' });
db.booking.belongsTo(db.dealer);

db.vehicle.hasMany(db.booking, { foreignKey: 'vehicleId' });
db.booking.belongsTo(db.vehicle);

//review
db.review=require('./models/review')(sequelize,Sequelize);

db.user.hasMany(db.review, {foreignKey: 'userId'});
db.review.belongsTo(db.user);

db.vehicle.hasMany(db.review,{foreignKey:'vehicleId'});
db.review.belongsTo(db.vehicle);

db.booking.hasMany(db.extrafair,{foreignKey:'bookingId'});
db.extrafair.belongsTo(db.booking);

//driver
db.driver=require('./models/driver')(sequelize,Sequelize);

module.exports = db;