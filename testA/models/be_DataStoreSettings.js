'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('be_DataStoreSettings', {
    DataStoreSettingRowId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    BlogId: {
      type: DataTypes.UUID,
    },
    ExtensionType: {
      type: DataTypes.STRING,
    },
    ExtensionId: {
      type: DataTypes.STRING,
    },
    Settings: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'be_DataStoreSettings',
    
    timestamps: false,
    
  });

  return Model;
};

