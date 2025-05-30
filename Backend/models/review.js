module.exports = (sequelize, Sequelize) => {
    var review = sequelize.define('review', {
        id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        vehicleId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'vehicles',
                key: 'id'
            }
        },
        rating: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        feedback:{
            type:Sequelize.STRING,
            allowNull: false
        }
    })
    return review;
}