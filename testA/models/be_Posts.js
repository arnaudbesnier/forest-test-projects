'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('be_Posts', {
    PostRowID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    BlogID: {
      type: DataTypes.UUID,
    },
    PostID: {
      type: DataTypes.UUID,
    },
    Title: {
      type: DataTypes.STRING,
    },
    Description: {
      type: DataTypes.STRING,
    },
    PostContent: {
      type: DataTypes.STRING,
    },
    DateCreated: {
      type: DataTypes.DATE,
    },
    DateModified: {
      type: DataTypes.DATE,
    },
    Author: {
      type: DataTypes.STRING,
    },
    IsPublished: {
      type: DataTypes.BOOLEAN,
    },
    IsCommentEnabled: {
      type: DataTypes.BOOLEAN,
    },
    Raters: {
      type: DataTypes.INTEGER,
    },
    Rating: {
      type: DataTypes.DOUBLE,
    },
    Slug: {
      type: DataTypes.STRING,
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'be_Posts',
    
    timestamps: false,
    
  });

  return Model;
};

