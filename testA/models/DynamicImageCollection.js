'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('DynamicImageCollection', {
    DynamicImageCollectionID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    DynamicImageID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    DynamicCollectionID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    DisplayOrder: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'DynamicImageCollection',
    
    timestamps: false,
    
  });

  return Model;
};

