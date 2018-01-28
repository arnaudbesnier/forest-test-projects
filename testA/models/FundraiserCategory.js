'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('FundraiserCategory', {
    FundraiserCategoryID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Name: {
      type: DataTypes.STRING,
    },
    CategoryTitleURL: {
      type: DataTypes.STRING,
    },
    Active: {
      type: DataTypes.BOOLEAN,
    },
    DisplayOrder: {
      type: DataTypes.INTEGER,
    },
    importID: {
      type: DataTypes.INTEGER,
    },
    ShortName: {
      type: DataTypes.STRING,
    },
    ListingURL: {
      type: DataTypes.STRING,
    },
    CategoryIconClass: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'FundraiserCategory',
    
    timestamps: false,
    
  });

  return Model;
};

