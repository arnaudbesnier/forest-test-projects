'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('MailoutMailingList', {
    MailoutMailingListID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    MailingListID: {
      type: DataTypes.INTEGER,
    },
    MailoutID: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'MailoutMailingList',
    
    timestamps: false,
    
  });

  return Model;
};

