
module.exports=(sequelize,Sequelize)=>
{
    //customer table name
    var dealer=sequelize.define('dealer',{
        id:{type:Sequelize.INTEGER,autoIncrement:true,primaryKey:true},
        name:{type:Sequelize.STRING,allowNull:false}, //name email age column name
        email:{type:Sequelize.STRING,allowNull:false,unique:true},
        password:{type:Sequelize.STRING,allowNull:false},
        adhar_card:{type:Sequelize.STRING,allowNull:false},
        pan_card:{type:Sequelize.STRING,allowNull:false},
        mobile:{type:Sequelize.STRING,allowNull:false},
        gender:{type:Sequelize.STRING,allowNull:false},
        photo:{type:Sequelize.STRING,allowNull:false},
        address:{type:Sequelize.STRING,allowNull:false},
        city:{type:Sequelize.STRING,allowNull:false},
        status:{type:Sequelize.STRING,allowNull:false,defaultValue:'Inactive'},
    })
    return dealer;
}