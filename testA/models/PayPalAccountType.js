'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('PayPalAccountType', {
    PayPalAccountTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    AccountType: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'PayPalAccountType',
    
    timestamps: false,
    
  });

  return Model;
};

