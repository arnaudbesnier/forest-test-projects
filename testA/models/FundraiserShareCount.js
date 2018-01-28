'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('FundraiserShareCount', {
    FundraiserShareCountID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FundraiserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Count: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'FundraiserShareCount',
    
    timestamps: false,
    
  });

  return Model;
};

