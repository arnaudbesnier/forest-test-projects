'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('Languages', {
    LanguageID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Culture: {
      type: DataTypes.STRING,
    },
    CultureName: {
      type: DataTypes.STRING,
    },
    Active: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'Languages',
    
    timestamps: false,
    
  });

  return Model;
};

