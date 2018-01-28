'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('ActivationEmailLog', {
    ActivationEmailLogID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FundraiserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    PaymentPortal: {
      type: DataTypes.INTEGER,
    },
    DaysAfterFirstDonation: {
      type: DataTypes.INTEGER,
    },
    DateSent: {
      type: DataTypes.DATE,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'ActivationEmailLog',
    
    timestamps: false,
    
  });

  return Model;
};

