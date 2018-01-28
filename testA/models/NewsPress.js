'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('NewsPress', {
    NewsPressID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Title: {
      type: DataTypes.STRING,
    },
    Author: {
      type: DataTypes.STRING,
    },
    Origin: {
      type: DataTypes.STRING,
    },
    Date: {
      type: DataTypes.DATE,
    },
    Summary: {
      type: DataTypes.STRING,
    },
    StoryHTML: {
      type: DataTypes.STRING,
    },
    StoryText: {
      type: DataTypes.STRING,
    },
    Image: {
      type: DataTypes.STRING,
    },
    Featured: {
      type: DataTypes.BOOLEAN,
    },
    Active: {
      type: DataTypes.BOOLEAN,
    },
    Archived: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'NewsPress',
    
    timestamps: false,
    
  });

  return Model;
};

