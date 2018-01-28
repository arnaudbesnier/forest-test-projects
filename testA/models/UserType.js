'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('UserType', {
    UserTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    TypeName: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'UserType',
    
    timestamps: false,
    
  });

  return Model;
};

