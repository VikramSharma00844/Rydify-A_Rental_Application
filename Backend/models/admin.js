
module.exports=(sequelize,Sequelize)=>
{
    //admin table name
    var admin=sequelize.define('admin',{
        id:{type:Sequelize.INTEGER,primaryKey:true,autoIncrement:true},//primary key
        name:{type:Sequelize.STRING,allowNull:false}, //name email age column name
        email:{type:Sequelize.STRING,allowNull:false},
        password:{type:Sequelize.STRING,allowNull:false},
        type:{type:Sequelize.STRING,defaultValue:'Admin'},
    })
    return admin;
}