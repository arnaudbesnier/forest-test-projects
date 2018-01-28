'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('FundraiserPaymentError', {
    PaymentErrorId: {
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
    PaymentErrorMapId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    UnknownErrorCode: {
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
    tableName: 'FundraiserPaymentError',
    
    timestamps: false,
    
  });

  return Model;
};

