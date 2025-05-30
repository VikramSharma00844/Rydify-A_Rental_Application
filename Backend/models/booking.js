module.exports = (sequelize, Sequelize) => {
    var booking = sequelize.define('booking', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' }
        },
        vehicleId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'vehicles', key: 'id' }
        },
        dealerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'dealers', key: 'id' }
        },
        with_driver:{type:Sequelize.STRING, allowNull: false},
        driverId:{type:Sequelize.STRING},
        start_date: { type: Sequelize.DATE, allowNull: false },
        end_date: { type: Sequelize.DATE, allowNull: false },
        days: { type: Sequelize.INTEGER, allowNull: false },
        pickup_location: { type: Sequelize.STRING, allowNull: false },
        dropoff_location: { type: Sequelize.STRING, allowNull: false },
        total_price: { type: Sequelize.INTEGER, allowNull: false },
        adharcard:{type:Sequelize.STRING,allowNull:false},
        driving_licence:{type:Sequelize.STRING,allowNull:false},
        booking_status: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'Pending'
        }
    });

    return booking;
};
