'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('NewsletterActionType', {
    NewsletterActionTypeID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Type: {
      type: DataTypes.STRING,
    },
    DisplayName: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'NewsletterActionType',
    
    timestamps: false,
    
  });

  return Model;
};

