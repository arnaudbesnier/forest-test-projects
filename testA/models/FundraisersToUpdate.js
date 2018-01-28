'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('FundraisersToUpdate', {
    FundraiserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'FundraisersToUpdate',
    
    timestamps: false,
    
  });

  return Model;
};

