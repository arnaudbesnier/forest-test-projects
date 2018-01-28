'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('ELMAH_Error', {
    ErrorId: {
      type: DataTypes.UUID,
      primaryKey: true 
    },
    Application: {
      type: DataTypes.STRING,
    },
    Host: {
      type: DataTypes.STRING,
    },
    Type: {
      type: DataTypes.STRING,
    },
    Source: {
      type: DataTypes.STRING,
    },
    Message: {
      type: DataTypes.STRING,
    },
    User: {
      type: DataTypes.STRING,
    },
    StatusCode: {
      type: DataTypes.INTEGER,
    },
    TimeUtc: {
      type: DataTypes.DATE,
    },
    Sequence: {
      type: DataTypes.INTEGER,
    },
    AllXml: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'ELMAH_Error',
    
    timestamps: false,
    
  });

  return Model;
};

