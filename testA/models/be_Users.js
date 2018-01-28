'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('be_Users', {
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    BlogID: {
      type: DataTypes.UUID,
    },
    UserName: {
      type: DataTypes.STRING,
    },
    Password: {
      type: DataTypes.STRING,
    },
    LastLoginTime: {
      type: DataTypes.DATE,
    },
    EmailAddress: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'be_Users',
    
    timestamps: false,
    
  });

  return Model;
};

