'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('AuditActionType', {
    AuditActionTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    ActionType: {
      type: DataTypes.STRING,
    },
    TypeDescription: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'AuditActionType',
    
    timestamps: false,
    
  });

  return Model;
};

