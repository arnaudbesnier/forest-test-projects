'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('UserAuthenticationLog', {
    UserAuthenticationLog: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    AuthenticationKey: {
      type: DataTypes.STRING,
    },
    DateCreated: {
      type: DataTypes.DATE,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'UserAuthenticationLog',
    
    timestamps: false,
    
  });

  return Model;
};

