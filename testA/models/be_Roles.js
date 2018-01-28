'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('be_Roles', {
    RoleID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    BlogID: {
      type: DataTypes.UUID,
    },
    Role: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'be_Roles',
    
    timestamps: false,
    
  });

  return Model;
};

