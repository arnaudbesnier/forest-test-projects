'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('CMMicrositeUser', {
    CMMicrositeUserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    CMMicrositeID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'CMMicrositeUser',
    
    timestamps: false,
    
  });

  return Model;
};

