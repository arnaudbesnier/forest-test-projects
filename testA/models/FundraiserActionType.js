'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('FundraiserActionType', {
    FundraiserActionTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    ActionTypeName: {
      type: DataTypes.STRING,
    },
    SmyteVerdictId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'FundraiserActionType',
    
    timestamps: false,
    
  });

  return Model;
};

