'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('WePayAccountMessaging', {
    AccountMessagingId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    UserTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    OrganizerUserStateId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    BeneficiaryUserStateId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    OrganizerAccountStateId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    BeneficiaryAccountStateId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    MainStatusMessage: {
      type: DataTypes.STRING,
    },
    FundStatusMessage: {
      type: DataTypes.STRING,
    },
    AccountMessageType: {
      type: DataTypes.INTEGER,
    },
    AlertStatusMessage: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'WePayAccountMessaging',
    
    timestamps: false,
    
  });

  return Model;
};

