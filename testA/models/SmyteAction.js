'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('SmyteAction', {
    SmyteActionId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    ActionName: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'SmyteAction',
    
    timestamps: false,
    
  });

  return Model;
};

