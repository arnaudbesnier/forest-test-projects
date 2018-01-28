'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('PaymentProvider', {
    PaymentProviderId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    ProviderName: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'PaymentProvider',
    
    timestamps: false,
    
  });

  return Model;
};

