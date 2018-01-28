'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('SMItem', {
    SMItemID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    SMItemParentID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    CMPageID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    Name: {
      type: DataTypes.STRING,
    },
    Rank: {
      type: DataTypes.INTEGER,
    },
    ShowInMenu: {
      type: DataTypes.BOOLEAN,
    },
    CMMicrositeID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    MicrositeDefault: {
      type: DataTypes.BOOLEAN,
    },
    LanguageID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    NeedsApproval: {
      type: DataTypes.BOOLEAN,
    },
    OriginalSMItemID: {
      type: DataTypes.INTEGER,
    },
    EditorDeleted: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'SMItem',
    
    timestamps: false,
    
  });

  return Model;
};

