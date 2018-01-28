'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('PaymentTrackingMap', {
    PaymentTrackingMapId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    PaymentProviderId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    TrackingType: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'PaymentTrackingMap',
    
    timestamps: false,
    
  });

  return Model;
};

