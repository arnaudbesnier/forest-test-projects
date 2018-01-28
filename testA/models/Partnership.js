'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('Partnership', {
    PartnershipID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    CookieID: {
      type: DataTypes.STRING,
    },
    DisplayName: {
      type: DataTypes.STRING,
    },
    CollectEmails: {
      type: DataTypes.BOOLEAN,
    },
    CheckedByDefault: {
      type: DataTypes.BOOLEAN,
    },
    SubscriptionText: {
      type: DataTypes.STRING,
    },
    Logo: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'Partnership',
    
    timestamps: false,
    
  });

  return Model;
};

