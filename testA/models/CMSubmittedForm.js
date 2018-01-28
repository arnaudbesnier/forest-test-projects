'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('CMSubmittedForm', {
    CMSubmittedFormID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FormHTML: {
      type: DataTypes.STRING,
    },
    ResponsePageID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    DateSubmitted: {
      type: DataTypes.DATE,
    },
    FormRecipient: {
      type: DataTypes.STRING,
    },
    IsProcessed: {
      type: DataTypes.BOOLEAN,
    },
    CMMicrositeID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    UploadedFile: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'CMSubmittedForm',
    
    timestamps: false,
    
  });

  return Model;
};

