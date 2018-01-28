'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('FundraiserSum_View', {
    FundraiserID: {
      type: DataTypes.INTEGER,
    },
    Expr1: {
      type: DataTypes.DOUBLE,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'FundraiserSum_View',
    
    timestamps: false,
    
  });

  return Model;
};

