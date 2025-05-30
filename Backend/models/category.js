module.exports=(sequelize,Sequelize)=>
{
    //customer table name
    var category=sequelize.define('category',{
        id:{type:Sequelize.INTEGER,autoIncrement:true,primaryKey:true},
        name:{type:Sequelize.STRING,allowNull:false}, //name email age column name
        photo:{type:Sequelize.STRING,allowNull:false},
    })
    return category;
}