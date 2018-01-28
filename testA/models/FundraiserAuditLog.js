'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('FundraiserAuditLog', {
    FundraiserAuditLogId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FundraiserId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FundraiserActionTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    ActionDateUtc: {
      type: DataTypes.DATE,
    },
    IsAdminAction: {
      type: DataTypes.BOOLEAN,
    },
    ReporterUserId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    UserReportSubjectId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'FundraiserAuditLog',
    
    timestamps: false,
    
  });

  return Model;
};

