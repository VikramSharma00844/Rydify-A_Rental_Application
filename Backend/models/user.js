
module.exports=(sequelize,Sequelize)=>
{
    //customer table name
    var user=sequelize.define('user',{
        id:{type:Sequelize.INTEGER,autoIncrement:true,primaryKey:true},
        first_name:{type:Sequelize.STRING,allowNull:false}, //name email age column name
        last_name:{type:Sequelize.STRING,allowNull:false},
        email:{type:Sequelize.STRING,allowNull:false,unique:true},
        password:{type:Sequelize.STRING,allowNull:false},
        mobile:{type:Sequelize.STRING,allowNull:false},
        gender:{type:Sequelize.STRING,allowNull:false},
        photo:{type:Sequelize.STRING,allowNull:false},
        address:{type:Sequelize.STRING,allowNull:false},
        city:{type:Sequelize.STRING,allowNull:false},
        status:{type:Sequelize.STRING,allowNull:false,defaultValue:'Active'},
    })
    return user;
}