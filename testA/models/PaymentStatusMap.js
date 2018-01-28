'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('PaymentStatusMap', {
    StatusMapId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    PaymentStatusId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    PaymentProviderId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    ProviderStatus: {
      type: DataTypes.STRING,
    },
    StatusDescription: {
      type: DataTypes.STRING,
    },
    UserDescription: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'PaymentStatusMap',
    
    timestamps: false,
    
  });

  return Model;
};

