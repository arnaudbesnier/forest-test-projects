'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('Facebook', {
    FacebookID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FacebookGraphID: {
      type: DataTypes.INTEGER,
    },
    UserEmail: {
      type: DataTypes.STRING,
    },
    AuthToken: {
      type: DataTypes.STRING,
    },
    FirstName: {
      type: DataTypes.STRING,
    },
    LastName: {
      type: DataTypes.STRING,
    },
    UserLocation: {
      type: DataTypes.STRING,
    },
    TokenUpdateDate: {
      type: DataTypes.DATE,
    },
    TokenType: {
      type: DataTypes.INTEGER,
    },
    ExpirationDate: {
      type: DataTypes.DATE,
    },
    FriendsCount: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'Facebook',
    
    timestamps: false,
    
  });

  return Model;
};

