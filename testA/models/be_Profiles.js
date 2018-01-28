'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('be_Profiles', {
    ProfileID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    BlogID: {
      type: DataTypes.UUID,
    },
    UserName: {
      type: DataTypes.STRING,
    },
    SettingName: {
      type: DataTypes.STRING,
    },
    SettingValue: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'be_Profiles',
    
    timestamps: false,
    
  });

  return Model;
};

