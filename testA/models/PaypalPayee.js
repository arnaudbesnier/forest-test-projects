'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('PaypalPayee', {
    PayPalID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    AccountID: {
      type: DataTypes.STRING,
    },
    PayPalEmail: {
      type: DataTypes.STRING,
    },
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'PaypalPayee',
    
    timestamps: false,
    
  });

  return Model;
};

