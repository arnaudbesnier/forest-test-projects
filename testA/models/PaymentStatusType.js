'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('PaymentStatusType', {
    PaymentStatusTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    StatusType: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'PaymentStatusType',
    
    timestamps: false,
    
  });

  return Model;
};

