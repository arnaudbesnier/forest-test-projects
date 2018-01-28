'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('SiteSettingsDataType', {
    SiteSettingsDataTypeID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Type: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'SiteSettingsDataType',
    
    timestamps: false,
    
  });

  return Model;
};

