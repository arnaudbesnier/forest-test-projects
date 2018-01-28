'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('UserInfo', {
    UserInfoID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FirstName: {
      type: DataTypes.STRING,
    },
    LastName: {
      type: DataTypes.STRING,
    },
    Address1: {
      type: DataTypes.STRING,
    },
    Address2: {
      type: DataTypes.STRING,
    },
    City: {
      type: DataTypes.STRING,
    },
    StateID: {
      type: DataTypes.INTEGER,
    },
    State: {
      type: DataTypes.STRING,
    },
    CountryID: {
      type: DataTypes.INTEGER,
    },
    Zip: {
      type: DataTypes.STRING,
    },
    Phone: {
      type: DataTypes.STRING,
    },
    DateOfBirth: {
      type: DataTypes.DATE,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'UserInfo',
    
    timestamps: false,
    
  });

  return Model;
};

