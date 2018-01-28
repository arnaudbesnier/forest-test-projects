'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('TipGuide', {
    TipGuideId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    TipOptions: {
      type: DataTypes.STRING,
    },
    DonationMinimum: {
      type: DataTypes.DOUBLE,
    },
    DonationMaximum: {
      type: DataTypes.DOUBLE,
    },
    TipTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FundraiserCategoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    UpdateDateUtc: {
      type: DataTypes.DATE,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'TipGuide',
    
    timestamps: false,
    
  });

  return Model;
};

