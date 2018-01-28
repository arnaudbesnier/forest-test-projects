'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('FundraiserPaymentTracking', {
    PaymentTrackingId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FundraiserPaymentId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    PaymentProviderId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    PaymentTrackingMapId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    ProviderTrackingId: {
      type: DataTypes.STRING,
    },
    UpdateDate: {
      type: DataTypes.DATE,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'FundraiserPaymentTracking',
    
    timestamps: false,
    
  });

  return Model;
};

