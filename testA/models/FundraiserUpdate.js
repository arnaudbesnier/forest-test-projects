'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('FundraiserUpdate', {
    FundraiserUpdateID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FundraiserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Message: {
      type: DataTypes.STRING,
    },
    Image: {
      type: DataTypes.STRING,
    },
    YoutubeURL: {
      type: DataTypes.STRING,
    },
    UserId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    MediaType: {
      type: DataTypes.INTEGER,
    },
    MediaSource: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'FundraiserUpdate',
    
    timestamps: false,
    
  });

  return Model;
};

