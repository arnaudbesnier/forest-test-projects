'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('PayPalStatusMessaging', {
    PayPalStatusMessagingId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    UserTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    AccountType: {
      type: DataTypes.STRING,
    },
    IsVerified: {
      type: DataTypes.BOOLEAN,
    },
    AlertStatusMessage: {
      type: DataTypes.STRING,
    },
    AccountMessageType: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'PayPalStatusMessaging',
    
    timestamps: false,
    
  });

  return Model;
};

