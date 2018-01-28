'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('be_PostCategory', {
    PostCategoryID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    BlogID: {
      type: DataTypes.UUID,
    },
    PostID: {
      type: DataTypes.UUID,
    },
    CategoryID: {
      type: DataTypes.UUID,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'be_PostCategory',
    
    timestamps: false,
    
  });

  return Model;
};

