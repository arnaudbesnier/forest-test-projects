'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('WePayUserState', {
    WePayUserStateId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    UserState: {
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
    tableName: 'WePayUserState',
    
    timestamps: false,
    
  });

  return Model;
};

