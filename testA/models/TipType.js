'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('TipType', {
    TipTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Name: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'TipType',
    
    timestamps: false,
    
  });

  return Model;
};

