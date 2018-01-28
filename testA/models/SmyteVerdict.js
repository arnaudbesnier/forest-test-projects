'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('SmyteVerdict', {
    SmyteVerdictId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    SmyteVerdictName: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'SmyteVerdict',
    
    timestamps: false,
    
  });

  return Model;
};

