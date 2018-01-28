'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('ErrorLog', {
    ErrorLogID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    ErrorTime: {
      type: DataTypes.DATE,
    },
    UserName: {
      type: DataTypes.STRING,
    },
    ErrorNumber: {
      type: DataTypes.INTEGER,
    },
    ErrorSeverity: {
      type: DataTypes.INTEGER,
    },
    ErrorState: {
      type: DataTypes.INTEGER,
    },
    ErrorProcedure: {
      type: DataTypes.STRING,
    },
    ErrorLine: {
      type: DataTypes.INTEGER,
    },
    ErrorMessage: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'ErrorLog',
    
    timestamps: false,
    
  });

  return Model;
};

