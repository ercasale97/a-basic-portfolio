module.exports = function (sequelize, DataTypes) {
    var Event = sequelize.define("Event", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        artist: {
            type: DataTypes.STRING,
        }
    })

    Event.associate = function (models) {
        Event.belongsToMany(models.User, { through: 'Attendee' })
    }

    return Event;
};