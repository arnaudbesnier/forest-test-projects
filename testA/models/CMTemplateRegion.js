'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('CMTemplateRegion', {
    CMTemplateRegionID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    CMTemplateID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    RegionName: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'CMTemplateRegion',
    
    timestamps: false,
    
  });

  return Model;
};

