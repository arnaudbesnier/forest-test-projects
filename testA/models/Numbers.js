'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('Numbers', {
    NumberId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Name: {
      type: DataTypes.STRING,
    },
    Value: {
      type: DataTypes.DOUBLE,
    },
    Decimals: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'Numbers',
    
    timestamps: false,
    
  });

  return Model;
};

