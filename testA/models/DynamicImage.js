'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('DynamicImage', {
    DynamicImageID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Name: {
      type: DataTypes.STRING,
    },
    Title: {
      type: DataTypes.STRING,
    },
    Link: {
      type: DataTypes.STRING,
    },
    Duration: {
      type: DataTypes.INTEGER,
    },
    Caption: {
      type: DataTypes.STRING,
    },
    Active: {
      type: DataTypes.BOOLEAN,
    },
    IsVideo: {
      type: DataTypes.BOOLEAN,
    },
    LastUpdated: {
      type: DataTypes.DATE,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'DynamicImage',
    
    timestamps: false,
    
  });

  return Model;
};

