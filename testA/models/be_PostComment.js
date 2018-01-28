'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('be_PostComment', {
    PostCommentRowID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    BlogID: {
      type: DataTypes.UUID,
    },
    PostCommentID: {
      type: DataTypes.UUID,
    },
    PostID: {
      type: DataTypes.UUID,
    },
    ParentCommentID: {
      type: DataTypes.UUID,
    },
    CommentDate: {
      type: DataTypes.DATE,
    },
    Author: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
    },
    Website: {
      type: DataTypes.STRING,
    },
    Comment: {
      type: DataTypes.STRING,
    },
    Country: {
      type: DataTypes.STRING,
    },
    Ip: {
      type: DataTypes.STRING,
    },
    IsApproved: {
      type: DataTypes.BOOLEAN,
    },
    ModeratedBy: {
      type: DataTypes.STRING,
    },
    Avatar: {
      type: DataTypes.STRING,
    },
    IsSpam: {
      type: DataTypes.BOOLEAN,
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'be_PostComment',
    
    timestamps: false,
    
  });

  return Model;
};

