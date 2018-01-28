'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('ManageFundraiserMap', {
    ManageFundraiserMapId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FundraiserId: {
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
    tableName: 'ManageFundraiserMap',
    
    timestamps: false,
    
  });

  return Model;
};

