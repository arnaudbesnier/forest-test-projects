'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('StripeAccountInfo', {
    StripeAccountInfoId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FundraiserUserMapId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    AccountId: {
      type: DataTypes.STRING,
    },
    PublishableKey: {
      type: DataTypes.STRING,
    },
    SecretKey: {
      type: DataTypes.STRING,
    },
    VerificationStatusId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    TosAcceptanceDate: {
      type: DataTypes.DATE,
    },
    ChargesEnabled: {
      type: DataTypes.BOOLEAN,
    },
    PayoutsEnabled: {
      type: DataTypes.BOOLEAN,
    },
    UpdateDateUtc: {
      type: DataTypes.DATE,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'StripeAccountInfo',
    
    timestamps: false,
    
  });

  return Model;
};

