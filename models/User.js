const sequelize = require("../config/db");
const { DataTypes } = require('sequelize');

const TestUser = sequelize.define('TestUser', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true
    }, 
    googleId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "tbl_test_user"
});

module.exports =  TestUser; 