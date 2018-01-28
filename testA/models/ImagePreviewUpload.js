'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('ImagePreviewUpload', {
    ImagePreviewUploadId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Image: {
      type: DataTypes.STRING,
    },
    ImageType: {
      type: DataTypes.INTEGER,
    },
    CreatedDate: {
      type: DataTypes.DATE,
    },
    UpdatedDate: {
      type: DataTypes.DATE,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'ImagePreviewUpload',
    
    timestamps: false,
    
  });

  return Model;
};

