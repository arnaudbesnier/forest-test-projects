'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('ReleaseVersion', {
    VersionId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    ReleaseIdentifier: {
      type: DataTypes.STRING,
    },
    UpdateDateUtc: {
      type: DataTypes.DATE,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'ReleaseVersion',
    
    timestamps: false,
    
  });

  return Model;
};

