'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('CMTemplateControl', {
    CMTemplateControlID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    CMTemplateID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FileName: {
      type: DataTypes.STRING,
    },
    ContentPlaceHolderID: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'CMTemplateControl',
    
    timestamps: false,
    
  });

  return Model;
};

