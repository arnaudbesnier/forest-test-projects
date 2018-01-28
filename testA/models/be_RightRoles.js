'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('be_RightRoles', {
    RightRoleRowId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    BlogId: {
      type: DataTypes.UUID,
    },
    RightName: {
      type: DataTypes.STRING,
    },
    Role: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'be_RightRoles',
    
    timestamps: false,
    
  });

  return Model;
};

