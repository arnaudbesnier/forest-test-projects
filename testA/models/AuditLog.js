'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('AuditLog', {
    AuditLogId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    TableName: {
      type: DataTypes.STRING,
    },
    AuditActionTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    UpdateDate: {
      type: DataTypes.DATE,
    },
    FundraiserId: {
      type: DataTypes.INTEGER,
    },
    PaymentId: {
      type: DataTypes.INTEGER,
    },
    UserId: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'AuditLog',
    
    timestamps: false,
    
  });

  return Model;
};

