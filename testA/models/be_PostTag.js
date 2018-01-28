'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('be_PostTag', {
    PostTagID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    BlogID: {
      type: DataTypes.UUID,
    },
    PostID: {
      type: DataTypes.UUID,
    },
    Tag: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'be_PostTag',
    
    timestamps: false,
    
  });

  return Model;
};

