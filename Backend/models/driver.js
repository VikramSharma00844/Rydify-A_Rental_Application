module.exports=(sequelize,Sequelize)=>
{
    //customer table name
    var driver=sequelize.define('driver',{
        id:{type:Sequelize.INTEGER,autoIncrement:true,primaryKey:true},
        name:{type:Sequelize.STRING,allowNull:false}, //name email age column name
        dl:{type:Sequelize.STRING,allowNull:false},
        photo:{type:Sequelize.STRING,allowNull:false},
        rent_per_day:{type:Sequelize.INTEGER,allowNull:false,defaultValue:1000},
        status:{type:Sequelize.STRING,allowNull:false,defaultValue:'Available'},
    })
    return driver;
}