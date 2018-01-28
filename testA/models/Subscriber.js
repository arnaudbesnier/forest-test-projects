'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('Subscriber', {
    SubscriberID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    UserID: {
      type: DataTypes.INTEGER,
    },
    Email: {
      type: DataTypes.STRING,
    },
    DefaultNewsletterFormatID: {
      type: DataTypes.INTEGER,
    },
    Deleted: {
      type: DataTypes.BOOLEAN,
    },
    ReceiveSiteUpdates: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'Subscriber',
    
    timestamps: false,
    
  });

  return Model;
};

