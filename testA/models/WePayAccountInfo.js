'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('WePayAccountInfo', {
    AccountInfoId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FundraiserUserMapId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    WePayUserId: {
      type: DataTypes.INTEGER,
    },
    AccessToken: {
      type: DataTypes.STRING,
    },
    AccountId: {
      type: DataTypes.INTEGER,
    },
    ReferenceId: {
      type: DataTypes.UUID,
    },
    UserStateId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    AccountStateId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    AccountUrl: {
      type: DataTypes.STRING,
    },
    ConfirmationLastSent: {
      type: DataTypes.DATE,
    },
    UpdateDateUtc: {
      type: DataTypes.DATE,
    },
    DebitOptIn: {
      type: DataTypes.BOOLEAN,
    },
    ExpiresIn: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'WePayAccountInfo',
    
    timestamps: false,
    
  });

  return Model;
};

