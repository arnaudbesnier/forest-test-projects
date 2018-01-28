'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('be_PostNotify', {
    PostNotifyID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    BlogID: {
      type: DataTypes.UUID,
    },
    PostID: {
      type: DataTypes.UUID,
    },
    NotifyAddress: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'be_PostNotify',
    
    timestamps: false,
    
  });

  return Model;
};

