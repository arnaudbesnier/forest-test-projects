'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('SmyteLabel', {
    SmyteLabelId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FundraiserId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Labels: {
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
    tableName: 'SmyteLabel',
    
    timestamps: false,
    
  });

  return Model;
};

