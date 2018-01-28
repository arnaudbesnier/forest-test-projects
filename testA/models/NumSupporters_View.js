'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('NumSupporters_View', {
    FundraiserId: {
      type: DataTypes.INTEGER,
    },
    NumSupporters: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'NumSupporters_View',
    
    timestamps: false,
    
  });

  return Model;
};

