'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('be_Referrers', {
    ReferrerRowId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    BlogId: {
      type: DataTypes.UUID,
    },
    ReferrerId: {
      type: DataTypes.UUID,
    },
    ReferralDay: {
      type: DataTypes.DATE,
    },
    ReferrerUrl: {
      type: DataTypes.STRING,
    },
    ReferralCount: {
      type: DataTypes.INTEGER,
    },
    Url: {
      type: DataTypes.STRING,
    },
    IsSpam: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'be_Referrers',
    
    timestamps: false,
    
  });

  return Model;
};

