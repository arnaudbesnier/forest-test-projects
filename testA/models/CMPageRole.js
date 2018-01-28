'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('CMPageRole', {
    CMPageRoleID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    CMPageID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    RoleID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Editor: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'CMPageRole',
    
    timestamps: false,
    
  });

  return Model;
};

