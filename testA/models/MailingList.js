'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('MailingList', {
    MailingListID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Name: {
      type: DataTypes.STRING,
    },
    Active: {
      type: DataTypes.BOOLEAN,
    },
    Deleted: {
      type: DataTypes.BOOLEAN,
    },
    FundraiserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'MailingList',
    
    timestamps: false,
    
  });

  return Model;
};

