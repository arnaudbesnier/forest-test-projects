'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('PaymentAuditLog', {
    PaymentAuditLogId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FundraiserPaymentId: {
      type: DataTypes.INTEGER,
    },
    PaymentProviderId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    PaymentStatusId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    StatusMapId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    UpdateDate: {
      type: DataTypes.DATE,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'PaymentAuditLog',
    
    timestamps: false,
    
  });

  return Model;
};

