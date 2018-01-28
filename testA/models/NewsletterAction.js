'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('NewsletterAction', {
    NewsletterActionID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    NewsletterActionTypeID: {
      type: DataTypes.INTEGER,
    },
    MailoutID: {
      type: DataTypes.INTEGER,
    },
    Timestamp: {
      type: DataTypes.DATE,
    },
    IPAddress: {
      type: DataTypes.STRING,
    },
    SubscriberID: {
      type: DataTypes.INTEGER,
    },
    Email: {
      type: DataTypes.STRING,
    },
    Details: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'NewsletterAction',
    
    timestamps: false,
    
  });

  return Model;
};

