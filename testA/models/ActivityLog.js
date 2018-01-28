'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('ActivityLog', {
    ActivityLogID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Activity: {
      type: DataTypes.STRING,
    },
    Type: {
      type: DataTypes.STRING,
    },
    Url: {
      type: DataTypes.STRING,
    },
    Process: {
      type: DataTypes.STRING,
    },
    UserID: {
      type: DataTypes.INTEGER,
    },
    FundraiserID: {
      type: DataTypes.INTEGER,
    },
    UserAgent: {
      type: DataTypes.STRING,
    },
    Browser: {
      type: DataTypes.STRING,
    },
    IP: {
      type: DataTypes.STRING,
    },
    ActivityDate: {
      type: DataTypes.DATE,
    },
    Referrer: {
      type: DataTypes.STRING,
    },
    SessionID: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'ActivityLog',
    
    timestamps: false,
    
  });

  return Model;
};

