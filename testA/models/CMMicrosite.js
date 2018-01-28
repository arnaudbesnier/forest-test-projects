'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('CMMicrosite', {
    CMMicroSiteID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Name: {
      type: DataTypes.STRING,
      primaryKey: true 
    },
    Active: {
      type: DataTypes.BOOLEAN,
    },
    Published: {
      type: DataTypes.BOOLEAN,
    },
    Description: {
      type: DataTypes.STRING,
    },
    Location: {
      type: DataTypes.STRING,
    },
    Image: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'CMMicrosite',
    
    timestamps: false,
    
  });

  return Model;
};

