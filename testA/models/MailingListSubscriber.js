'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('MailingListSubscriber', {
    MailingListSubscriberID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    MailingListID: {
      type: DataTypes.INTEGER,
    },
    SubscriberID: {
      type: DataTypes.INTEGER,
    },
    NewsletterFormatID: {
      type: DataTypes.INTEGER,
    },
    Active: {
      type: DataTypes.BOOLEAN,
    },
    EntityID: {
      type: DataTypes.UUID,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'MailingListSubscriber',
    
    timestamps: false,
    
  });

  return Model;
};

