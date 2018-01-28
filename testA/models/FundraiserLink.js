'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('FundraiserLink', {
    FundraiserLinkID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FundraiserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    URL: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'FundraiserLink',
    
    timestamps: false,
    
  });

  return Model;
};

