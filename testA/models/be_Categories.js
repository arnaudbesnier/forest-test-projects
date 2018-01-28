'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('be_Categories', {
    CategoryRowID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    BlogID: {
      type: DataTypes.UUID,
    },
    CategoryID: {
      type: DataTypes.UUID,
    },
    CategoryName: {
      type: DataTypes.STRING,
    },
    Description: {
      type: DataTypes.STRING,
    },
    ParentID: {
      type: DataTypes.UUID,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'be_Categories',
    
    timestamps: false,
    
  });

  return Model;
};

