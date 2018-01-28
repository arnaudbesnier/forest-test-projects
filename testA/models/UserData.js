'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('UserData', {
    UserDataID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    DataKey: {
      type: DataTypes.STRING,
    },
    DataValue: {
      type: DataTypes.STRING,
    },
    RequireActiveSession: {
      type: DataTypes.BOOLEAN,
    },
    Created: {
      type: DataTypes.DATE,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'UserData',
    
    timestamps: false,
    
  });

  return Model;
};

