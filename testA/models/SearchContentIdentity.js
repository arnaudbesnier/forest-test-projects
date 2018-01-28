'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('SearchContentIdentity', {
    SearchContentIdentityID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    SearchContentID: {
      type: DataTypes.INTEGER,
    },
    Name: {
      type: DataTypes.STRING,
    },
    Value: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'SearchContentIdentity',
    
    timestamps: false,
    
  });

  return Model;
};

