'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('Partner', {
    PartnerId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    PartnerNameFull: {
      type: DataTypes.STRING,
    },
    PartnerNameShort: {
      type: DataTypes.STRING,
    },
    TokenId: {
      type: DataTypes.STRING,
    },
    DecryptionProviderName: {
      type: DataTypes.STRING,
    },
    RoleName: {
      type: DataTypes.STRING,
    },
    EncriptionKeyId: {
      type: DataTypes.STRING,
    },
    TokenHttpHeaderName: {
      type: DataTypes.STRING,
    },
    UpdateDateUtc: {
      type: DataTypes.DATE,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'Partner',
    
    timestamps: false,
    
  });

  return Model;
};

