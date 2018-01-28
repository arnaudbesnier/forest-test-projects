'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('FundraiserGoalChangeLog', {
    GoalChangeLogId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FundraiserId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    CurrentGoalAmount: {
      type: DataTypes.DOUBLE,
    },
    PreviousGoalAmount: {
      type: DataTypes.DOUBLE,
    },
    CurrentDonations: {
      type: DataTypes.DOUBLE,
    },
    PreviousDonations: {
      type: DataTypes.DOUBLE,
    },
    UpdateDateUtc: {
      type: DataTypes.DATE,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'FundraiserGoalChangeLog',
    
    timestamps: false,
    
  });

  return Model;
};

