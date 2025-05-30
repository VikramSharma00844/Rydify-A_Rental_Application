
module.exports=(sequelize,Sequelize)=>
{
    //customer table name
    var vehicle=sequelize.define('vehicle',{
        id:{type:Sequelize.INTEGER,autoIncrement:true,primaryKey:true},
        name:{type:Sequelize.STRING,allowNull:false}, //name email age column name
        vehicle_brand:{type:Sequelize.STRING,allowNull:false},
        vehicle_model:{type:Sequelize.STRING,allowNull:false},
        description:{type:Sequelize.STRING,allowNull:false},
        car_photo:{type:Sequelize.STRING,allowNull:false},
        rc:{type:Sequelize.STRING,allowNull:false},
        insurance:{type:Sequelize.STRING,allowNull:false},
        pollution:{type:Sequelize.STRING,allowNull:false},
        rent_per_day:{type:Sequelize.INTEGER,allowNull:false},
        status:{type:Sequelize.STRING,allowNull:false,defaultValue:'Available'},
        seat:{type:Sequelize.INTEGER,allowNull:false},
        categoryId:{type:Sequelize.INTEGER,allowNull:false,
            references: {
                model: 'categories',
                key: 'id'
            }
            },
        dealerId:{type:Sequelize.INTEGER,allowNull:false,
        references:{
            model: 'dealers',
            key: 'id'
        }
        },
    })
    return vehicle;
}