'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('be_Rights', {
    RightRowId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    BlogId: {
      type: DataTypes.UUID,
    },
    RightName: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'be_Rights',
    
    timestamps: false,
    
  });

  return Model;
};

