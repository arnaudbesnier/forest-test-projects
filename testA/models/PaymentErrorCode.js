'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('PaymentErrorCode', {
    ErrorCodeID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    InternalErrorCode: {
      type: DataTypes.INTEGER,
    },
    ProviderErrorCode: {
      type: DataTypes.STRING,
    },
    ShortDescription: {
      type: DataTypes.STRING,
    },
    Description: {
      type: DataTypes.STRING,
    },
    UserDescription: {
      type: DataTypes.STRING,
    },
    PaymentServiceTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    PaymentProviderId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'PaymentErrorCode',
    
    timestamps: false,
    
  });

  return Model;
};

