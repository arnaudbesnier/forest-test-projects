'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('NewsletterDesign', {
    NewsletterDesignID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Name: {
      type: DataTypes.STRING,
    },
    Path: {
      type: DataTypes.STRING,
    },
    Template: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'NewsletterDesign',
    
    timestamps: false,
    
  });

  return Model;
};

