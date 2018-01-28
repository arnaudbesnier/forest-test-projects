'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('RiskKeywords', {
    RiskID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Expression: {
      type: DataTypes.STRING,
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
    },
    Occurrence: {
      type: DataTypes.INTEGER,
    },
    Weight: {
      type: DataTypes.INTEGER,
    },
    RiskAction: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'RiskKeywords',
    
    timestamps: false,
    
  });

  return Model;
};

