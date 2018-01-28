'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('be_Blogs', {
    BlogRowId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    BlogId: {
      type: DataTypes.UUID,
    },
    BlogName: {
      type: DataTypes.STRING,
    },
    Hostname: {
      type: DataTypes.STRING,
    },
    IsAnyTextBeforeHostnameAccepted: {
      type: DataTypes.BOOLEAN,
    },
    StorageContainerName: {
      type: DataTypes.STRING,
    },
    VirtualPath: {
      type: DataTypes.STRING,
    },
    IsPrimary: {
      type: DataTypes.BOOLEAN,
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'be_Blogs',
    
    timestamps: false,
    
  });

  return Model;
};

