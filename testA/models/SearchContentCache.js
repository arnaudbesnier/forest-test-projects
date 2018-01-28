'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('SearchContentCache', {
    CacheID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    SearchProviderID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    HashCode: {
      type: DataTypes.INTEGER,
    },
    Name: {
      type: DataTypes.STRING,
    },
    Date: {
      type: DataTypes.DATE,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'SearchContentCache',
    
    timestamps: false,
    
  });

  return Model;
};

