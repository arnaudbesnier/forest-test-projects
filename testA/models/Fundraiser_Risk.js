'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('Fundraiser_Risk', {
    FundraiserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Score: {
      type: DataTypes.BOOLEAN,
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
    },
    isPaused: {
      type: DataTypes.BOOLEAN,
    },
    isLive: {
      type: DataTypes.BOOLEAN,
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'Fundraiser_Risk',
    
    timestamps: false,
    
  });

  return Model;
};

