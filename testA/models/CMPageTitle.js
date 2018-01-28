'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('CMPageTitle', {
    CMPageTitleID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    CMPageID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Title: {
      type: DataTypes.STRING,
    },
    LanguageID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'CMPageTitle',
    
    timestamps: false,
    
  });

  return Model;
};

