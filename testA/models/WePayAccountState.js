'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('WePayAccountState', {
    WePayAccountStateId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    AccountState: {
      type: DataTypes.STRING,
    },
    StateDescription: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'WePayAccountState',
    
    timestamps: false,
    
  });

  return Model;
};

