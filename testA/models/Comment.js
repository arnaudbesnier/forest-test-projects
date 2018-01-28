'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('Comment', {
    CommentID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    FundraiserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    SubmittedDateTime: {
      type: DataTypes.DATE,
    },
    Name: {
      type: DataTypes.STRING,
    },
    Comment: {
      type: DataTypes.STRING,
    },
    IsApproved: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'Comment',
    
    timestamps: false,
    
  });

  return Model;
};

