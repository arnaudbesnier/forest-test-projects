'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('BuildVersion', {
    SystemInformationID: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    "Database Version": {
      type: DataTypes.STRING,
    },
    VersionDate: {
      type: DataTypes.DATE,
    },
    ModifiedDate: {
      type: DataTypes.DATE,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'BuildVersion',
    timestamps: false,
  });

  return Model;
};
