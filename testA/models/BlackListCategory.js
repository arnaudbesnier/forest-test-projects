'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('BlackListCategory', {
    BlackListCategoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    BlacklistCategoryName: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'BlackListCategory',
    
    timestamps: false,
    
  });

  return Model;
};

