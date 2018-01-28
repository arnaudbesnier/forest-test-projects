'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('PaymentServiceType', {
    PaymentServiceTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    PaymentProviderId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    ServiceType: {
      type: DataTypes.STRING,
    },
    ServiceTypeDescription: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'PaymentServiceType',
    
    timestamps: false,
    
  });

  return Model;
};

