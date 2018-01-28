'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('FundraiserUserMap', {
    FundraiserUserMapId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FundraiserId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    UserId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    UserTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    BeneficiaryId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    UpdateDateUtc: {
      type: DataTypes.DATE,
    },
    PaymentProviderId: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'FundraiserUserMap',
    
    timestamps: false,
    
  });

  return Model;
};

