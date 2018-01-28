'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('FacebookUserRelation', {
    FacebookUserRelationID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FacebookID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    IsAccountLinked: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'FacebookUserRelation',
    
    timestamps: false,
    
  });

  return Model;
};

