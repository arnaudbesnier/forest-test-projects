'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('UserReportType', {
    UserReportTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    ReportType: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'UserReportType',
    
    timestamps: false,
    
  });

  return Model;
};

