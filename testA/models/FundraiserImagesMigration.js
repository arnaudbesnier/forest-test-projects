'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('FundraiserImagesMigration', {
    FundraiserImagesMigrationID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FundraiserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Created: {
      type: DataTypes.DATE,
    },
    Migrated: {
      type: DataTypes.DATE,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'FundraiserImagesMigration',
    
    timestamps: false,
    
  });

  return Model;
};

