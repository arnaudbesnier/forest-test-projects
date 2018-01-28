'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('CMPageRegion', {
    CMPageRegionID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    CMPageID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    CMTemplateRegionID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Content: {
      type: DataTypes.STRING,
    },
    ContentClean: {
      type: DataTypes.STRING,
    },
    CurrentVersion: {
      type: DataTypes.BOOLEAN,
    },
    Created: {
      type: DataTypes.DATE,
    },
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    LanguageID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    NeedsApproval: {
      type: DataTypes.BOOLEAN,
    },
    GlobalAreaCMPageID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    EditorUserIDs: {
      type: DataTypes.STRING,
    },
    Draft: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'CMPageRegion',
    
    timestamps: false,
    
  });

  return Model;
};

