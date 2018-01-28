'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('be_BlogRollItems', {
    BlogRollRowId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    BlogId: {
      type: DataTypes.UUID,
    },
    BlogRollId: {
      type: DataTypes.UUID,
    },
    Title: {
      type: DataTypes.STRING,
    },
    Description: {
      type: DataTypes.STRING,
    },
    BlogUrl: {
      type: DataTypes.STRING,
    },
    FeedUrl: {
      type: DataTypes.STRING,
    },
    Xfn: {
      type: DataTypes.STRING,
    },
    SortIndex: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'be_BlogRollItems',
    
    timestamps: false,
    
  });

  return Model;
};

