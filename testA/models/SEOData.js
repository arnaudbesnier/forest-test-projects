'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('SEOData', {
    SEODataID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    PageURL: {
      type: DataTypes.STRING,
    },
    FriendlyFilename: {
      type: DataTypes.STRING,
    },
    Title: {
      type: DataTypes.STRING,
    },
    Description: {
      type: DataTypes.STRING,
    },
    Keywords: {
      type: DataTypes.STRING,
    },
    DateCreated: {
      type: DataTypes.DATE,
    },
    DateLastUpdated: {
      type: DataTypes.DATE,
    },
    LanguageID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Approved: {
      type: DataTypes.BOOLEAN,
    },
    ApprovedSEODataID: {
      type: DataTypes.INTEGER,
    },
    SitemapPriority: {
      type: DataTypes.DOUBLE,
    },
    IncludeInXmlSitemap: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'SEOData',
    
    timestamps: false,
    
  });

  return Model;
};

