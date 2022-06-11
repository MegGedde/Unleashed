const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Seen extends Model {};

Seen.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      pet_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'pet',
          key: 'id'
        }
      },
      time: {
        type: DataTypes.TIME,
        defaultValue: '00:00',
        field: 'hour'
      },
      street: {
        type: DataTypes.STRING(255)
      },
      city: {
        type: DataTypes.STRING(),
        allowNull: false
      },
      state: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      country: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      zip_code: {
        type: DataTypes.INTEGER(5),
        allowNull: false
      },
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'seen'
    }
  );

  module.exports = Seen;