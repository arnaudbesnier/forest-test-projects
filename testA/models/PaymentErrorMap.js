'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('PaymentErrorMap', {
    PaymentErrorMapId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    StatusMapId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    PaymentProviderId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    ProviderErrorCode: {
      type: DataTypes.STRING,
    },
    StatusDescription: {
      type: DataTypes.STRING,
    },
    UserDescription: {
      type: DataTypes.STRING,
    },
    PaymentStatusTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'PaymentErrorMap',
    
    timestamps: false,
    
  });

  return Model;
};

