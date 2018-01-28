'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('State', {
    StateID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Name: {
      type: DataTypes.STRING,
    },
    Abb: {
      type: DataTypes.STRING,
    },
    CountryID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    ShipTo: {
      type: DataTypes.BOOLEAN,
    },
    ShippingMarkup: {
      type: DataTypes.DOUBLE,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'State',
    
    timestamps: false,
    
  });

  return Model;
};

