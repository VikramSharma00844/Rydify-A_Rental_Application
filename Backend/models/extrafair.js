module.exports=(sequelize,Sequelize)=>
{
    //customer table name
    var extrafair =sequelize.define('extrafair',{
        id:{type:Sequelize.INTEGER,autoIncrement:true,primaryKey:true},
        bookingId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'bookings',
                key: 'id'
            }
        },
        fair:{type:Sequelize.STRING,allowNull:false},
        reason:{type:Sequelize.STRING,allowNull:false},
    })
    return extrafair;
}