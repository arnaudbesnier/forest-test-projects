'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('SecurityQuestion', {
    SecurityQuestionID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Question: {
      type: DataTypes.STRING,
    },
    Active: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'SecurityQuestion',
    
    timestamps: false,
    
  });

  return Model;
};

