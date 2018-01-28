'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('Newsletter', {
    NewsletterID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    CreatedDate: {
      type: DataTypes.DATE,
    },
    DisplayDate: {
      type: DataTypes.DATE,
    },
    Active: {
      type: DataTypes.BOOLEAN,
    },
    Featured: {
      type: DataTypes.BOOLEAN,
    },
    Archived: {
      type: DataTypes.BOOLEAN,
    },
    Title: {
      type: DataTypes.STRING,
    },
    Issue: {
      type: DataTypes.STRING,
    },
    Description: {
      type: DataTypes.STRING,
    },
    Body: {
      type: DataTypes.STRING,
    },
    BodyText: {
      type: DataTypes.STRING,
    },
    Keywords: {
      type: DataTypes.STRING,
    },
    DesignID: {
      type: DataTypes.INTEGER,
    },
    Deleted: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'Newsletter',
    
    timestamps: false,
    
  });

  return Model;
};

