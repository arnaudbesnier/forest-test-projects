'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('ReportFundraiser', {
    ReportFundraiserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FundraiserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    ReportedDatetime: {
      type: DataTypes.DATE,
    },
    Reviewed: {
      type: DataTypes.BOOLEAN,
    },
    Reason: {
      type: DataTypes.STRING,
    },
    ReporteeContactEmail: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'ReportFundraiser',
    
    timestamps: false,
    
  });

  return Model;
};

