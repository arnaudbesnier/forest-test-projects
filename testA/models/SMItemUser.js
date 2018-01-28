'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('SMItemUser', {
    SMItemUserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    CMMicrositeID: {
      type: DataTypes.INTEGER,
    },
    MicrositeDefault: {
      type: DataTypes.BOOLEAN,
    },
    LanguageID: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'SMItemUser',
    
    timestamps: false,
    
  });

  return Model;
};

