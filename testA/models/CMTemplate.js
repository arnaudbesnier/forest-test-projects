'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('CMTemplate', {
    CMTemplateID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Name: {
      type: DataTypes.STRING,
    },
    Addable: {
      type: DataTypes.BOOLEAN,
    },
    MicrositeEnabled: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'CMTemplate',
    
    timestamps: false,
    
  });

  return Model;
};

