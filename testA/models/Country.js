'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('Country', {
    CountryID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Name: {
      type: DataTypes.STRING,
    },
    Abb: {
      type: DataTypes.STRING,
    },
    ShippingRateTypeID: {
      type: DataTypes.INTEGER,
    },
    ShipTo: {
      type: DataTypes.BOOLEAN,
    },
    ShippingMarkup: {
      type: DataTypes.DOUBLE,
    },
    HasStripeSupport: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'Country',
    
    timestamps: false,
    
  });

  return Model;
};

