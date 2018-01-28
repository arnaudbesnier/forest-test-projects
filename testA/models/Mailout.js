'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('Mailout', {
    MailoutID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    NewsletterID: {
      type: DataTypes.INTEGER,
    },
    Timestamp: {
      type: DataTypes.DATE,
    },
    DisplayDate: {
      type: DataTypes.DATE,
    },
    Title: {
      type: DataTypes.STRING,
    },
    Issue: {
      type: DataTypes.STRING,
    },
    Description: {
      type: DataTypes.STRING,
    },
    Body: {
      type: DataTypes.STRING,
    },
    BodyText: {
      type: DataTypes.STRING,
    },
    Keywords: {
      type: DataTypes.STRING,
    },
    DesignID: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'Mailout',
    
    timestamps: false,
    
  });

  return Model;
};

