'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('FundraiserGallery', {
    FundraiserGalleryID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FundraiserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Image: {
      type: DataTypes.STRING,
    },
    IsVideo: {
      type: DataTypes.BOOLEAN,
    },
    Active: {
      type: DataTypes.BOOLEAN,
    },
    DisplayOrder: {
      type: DataTypes.INTEGER,
    },
    MediaType: {
      type: DataTypes.STRING,
    },
    MediaSource: {
      type: DataTypes.STRING,
    },
    CreatedDateUtc: {
      type: DataTypes.DATE,
    },
    UpdateDateUtc: {
      type: DataTypes.DATE,
    },
    ImageBase64: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'FundraiserGallery',
    
    timestamps: false,
    
  });

  return Model;
};

