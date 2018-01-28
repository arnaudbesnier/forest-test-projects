'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('SiteSettings', {
    SiteSettingsID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Setting: {
      type: DataTypes.STRING,
      primaryKey: true 
    },
    Description: {
      type: DataTypes.STRING,
    },
    EmbeddedDescription: {
      type: DataTypes.STRING,
    },
    Value: {
      type: DataTypes.STRING,
    },
    DateCreated: {
      type: DataTypes.DATE,
    },
    DateLastModified: {
      type: DataTypes.DATE,
    },
    SiteComponentID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    SiteSettingsDataTypeID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    IsRequired: {
      type: DataTypes.BOOLEAN,
    },
    Options: {
      type: DataTypes.STRING,
    },
    IsCustom: {
      type: DataTypes.BOOLEAN,
    },
    DisplayOrder: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'SiteSettings',
    
    timestamps: false,
    
  });

  return Model;
};

