'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('PayPalAccountInfo', {
    AccountInfoId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FundraiserUserMapId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Email: {
      type: DataTypes.STRING,
    },
    FirstName: {
      type: DataTypes.STRING,
    },
    LastName: {
      type: DataTypes.STRING,
    },
    AccountTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    AccountVerified: {
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
    tableName: 'PayPalAccountInfo',
    
    timestamps: false,
    
  });

  return Model;
};

