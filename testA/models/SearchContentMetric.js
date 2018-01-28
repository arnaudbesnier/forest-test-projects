'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('SearchContentMetric', {
    SearchContentMetricID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    SearchContentID: {
      type: DataTypes.INTEGER,
    },
    Displayed: {
      type: DataTypes.BOOLEAN,
    },
    Clicked: {
      type: DataTypes.BOOLEAN,
    },
    Date: {
      type: DataTypes.DATE,
    },
    Query: {
      type: DataTypes.STRING,
    },
    Position: {
      type: DataTypes.INTEGER,
    },
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    SessionID: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'SearchContentMetric',
    
    timestamps: false,
    
  });

  return Model;
};

