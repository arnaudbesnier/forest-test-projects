'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('Beneficiary', {
    BeneficiaryId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    OrganizerUserId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FirstName: {
      type: DataTypes.STRING,
    },
    LastName: {
      type: DataTypes.STRING,
    },
    Email: {
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
    tableName: 'Beneficiary',
    
    timestamps: false,
    
  });

  return Model;
};

