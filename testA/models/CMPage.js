'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('CMPage', {
    CMPageID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    CMTemplateID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Title: {
      type: DataTypes.STRING,
    },
    FileName: {
      type: DataTypes.STRING,
    },
    Created: {
      type: DataTypes.DATE,
    },
    Deleted: {
      type: DataTypes.BOOLEAN,
    },
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FormRecipient: {
      type: DataTypes.STRING,
    },
    ResponsePageID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    CanDelete: {
      type: DataTypes.BOOLEAN,
    },
    CMMicrositeID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    MicrositeDefault: {
      type: DataTypes.BOOLEAN,
    },
    FeaturedPage: {
      type: DataTypes.BOOLEAN,
    },
    NeedsApproval: {
      type: DataTypes.BOOLEAN,
    },
    OriginalCMPageID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    EditorUserIDs: {
      type: DataTypes.STRING,
    },
    EditorDeleted: {
      type: DataTypes.BOOLEAN,
    },
    DynamicCollectionID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    PageSpecificCSS: {
      type: DataTypes.STRING,
    },
    PageSpecificJS: {
      type: DataTypes.STRING,
    },
    PageSpecificHeadMarkup: {
      type: DataTypes.STRING,
    },
    HasExpandedNavigation: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'CMPage',
    
    timestamps: false,
    
  });

  return Model;
};

