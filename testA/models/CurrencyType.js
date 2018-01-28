'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('CurrencyType', {
    CurrencyTypeID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    CurrencyName: {
      type: DataTypes.STRING,
    },
    CurrencyCode: {
      type: DataTypes.STRING,
    },
    CurrencySymbol: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'CurrencyType',
    
    timestamps: false,
    
  });

  return Model;
};

