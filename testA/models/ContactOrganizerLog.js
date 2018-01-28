'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('ContactOrganizerLog', {
    Email: {
      type: DataTypes.STRING,
    },
    ContactIp: {
      type: DataTypes.STRING,
    },
    ContactMessage: {
      type: DataTypes.STRING,
    },
    ContactOrganizerID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    CreatedDate: {
      type: DataTypes.DATE,
    },
    FundraiserID: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'ContactOrganizerLog',
    
    timestamps: false,
    
  });

  return Model;
};

