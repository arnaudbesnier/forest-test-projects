'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('sysdiagrams', {
    name: {
      type: DataTypes.STRING,
      primaryKey: true 
    },
    principal_id: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    diagram_id: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    version: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'sysdiagrams',
    underscored: true,
    timestamps: false,
    
  });

  return Model;
};

