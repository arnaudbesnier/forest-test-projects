'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('SmyteUserMapping', {
    SmyteUserMappingId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    UserId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    SmyteUserName: {
      type: DataTypes.STRING,
    },
    UpdateDateUtc: {
      type: DataTypes.DATE,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'SmyteUserMapping',
    
    timestamps: false,
    
  });

  return Model;
};

