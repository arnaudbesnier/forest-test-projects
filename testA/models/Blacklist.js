'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('Blacklist', {
    BlacklistId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    BlacklistTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    BlacklistCategoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Email: {
      type: DataTypes.STRING,
    },
    IP: {
      type: DataTypes.STRING,
    },
    Rules: {
      type: DataTypes.STRING,
    },
    SmyteActionId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    SmyteUserMappingId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    UpdateDateUtc: {
      type: DataTypes.DATE,
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'Blacklist',
    
    timestamps: false,
    
  });

  return Model;
};

