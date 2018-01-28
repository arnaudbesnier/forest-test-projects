'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('SiteComponent', {
    SiteComponentID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    ComponentName: {
      type: DataTypes.STRING,
    },
    DisplayName: {
      type: DataTypes.STRING,
    },
    MenuDisplayOrder: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'SiteComponent',
    
    timestamps: false,
    
  });

  return Model;
};

