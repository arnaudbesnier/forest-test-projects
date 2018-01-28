'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('UserReportLog', {
    UserReportLogId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    UserReportSubjectId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    UserReportTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FundraiserId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Name: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
    },
    Phone: {
      type: DataTypes.STRING,
    },
    Reason: {
      type: DataTypes.STRING,
    },
    UpdateDateUtc: {
      type: DataTypes.DATE,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'UserReportLog',
    
    timestamps: false,
    
  });

  return Model;
};

