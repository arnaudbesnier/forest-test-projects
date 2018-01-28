'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('User', {
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    ApplicationID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Name: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
    },
    IsApproved: {
      type: DataTypes.BOOLEAN,
    },
    UniqueEmail: {
      type: DataTypes.INTEGER,
    },
    Salt: {
      type: DataTypes.STRING,
    },
    Password: {
      type: DataTypes.STRING,
    },
    PasswordQuestion: {
      type: DataTypes.STRING,
    },
    PasswordAnswer: {
      type: DataTypes.STRING,
    },
    PasswordFormat: {
      type: DataTypes.INTEGER,
    },
    Created: {
      type: DataTypes.DATE,
    },
    LastLogin: {
      type: DataTypes.DATE,
    },
    LastActivity: {
      type: DataTypes.DATE,
    },
    LastPasswordChange: {
      type: DataTypes.DATE,
    },
    LastLockout: {
      type: DataTypes.DATE,
    },
    FailedPasswordAttempts: {
      type: DataTypes.INTEGER,
    },
    FailedAnswerAttempts: {
      type: DataTypes.INTEGER,
    },
    Deleted: {
      type: DataTypes.BOOLEAN,
    },
    Locked: {
      type: DataTypes.BOOLEAN,
    },
    Online: {
      type: DataTypes.BOOLEAN,
    },
    ChangePasswordID: {
      type: DataTypes.UUID,
    },
    importID: {
      type: DataTypes.INTEGER,
    },
    DevUserID: {
      type: DataTypes.INTEGER,
    },
    ReceiveSiteUpdates: {
      type: DataTypes.BOOLEAN,
    },
    MaxActiveSessions: {
      type: DataTypes.INTEGER,
    },
    AlternateEmail: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'User',
    
    timestamps: false,
    
  });

  return Model;
};

