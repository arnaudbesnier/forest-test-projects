'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('be_Pages', {
    PageRowID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    BlogID: {
      type: DataTypes.UUID,
    },
    PageID: {
      type: DataTypes.UUID,
    },
    Title: {
      type: DataTypes.STRING,
    },
    Description: {
      type: DataTypes.STRING,
    },
    PageContent: {
      type: DataTypes.STRING,
    },
    Keywords: {
      type: DataTypes.STRING,
    },
    DateCreated: {
      type: DataTypes.DATE,
    },
    DateModified: {
      type: DataTypes.DATE,
    },
    IsPublished: {
      type: DataTypes.BOOLEAN,
    },
    IsFrontPage: {
      type: DataTypes.BOOLEAN,
    },
    Parent: {
      type: DataTypes.UUID,
    },
    ShowInList: {
      type: DataTypes.BOOLEAN,
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
    tableName: 'be_Pages',
    
    timestamps: false,
    
  });

  return Model;
};

