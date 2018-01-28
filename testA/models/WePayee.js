'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('WePayee', {
    WePayeeID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    AccountID: {
      type: DataTypes.STRING,
    },
    AccessToken: {
      type: DataTypes.STRING,
    },
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'WePayee',
    
    timestamps: false,
    
  });

  return Model;
};

