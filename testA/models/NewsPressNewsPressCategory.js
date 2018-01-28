'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('NewsPressNewsPressCategory', {
    NewsPressNewsPressCategoryID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    NewsPressID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    NewsPressCategoryID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'NewsPressNewsPressCategory',
    
    timestamps: false,
    
  });

  return Model;
};

