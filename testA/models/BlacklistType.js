'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('BlacklistType', {
    BlacklistTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    BlacklistTypeName: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'BlacklistType',
    
    timestamps: false,
    
  });

  return Model;
};

