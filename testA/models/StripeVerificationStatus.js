'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('StripeVerificationStatus', {
    VerificationStatusId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    VerificationStatus: {
      type: DataTypes.STRING,
    },
    StatusDescription: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'StripeVerificationStatus',
    
    timestamps: false,
    
  });

  return Model;
};

