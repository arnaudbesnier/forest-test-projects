'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('PartnershipUser', {
    PartnershipUserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    PartnershipID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'PartnershipUser',
    
    timestamps: false,
    
  });

  return Model;
};

