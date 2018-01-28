'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('NewsPressCategory', {
    NewsPressCategoryID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    NewsPressParentCategoryID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Name: {
      type: DataTypes.STRING,
    },
    Active: {
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
    tableName: 'NewsPressCategory',
    
    timestamps: false,
    
  });

  return Model;
};

