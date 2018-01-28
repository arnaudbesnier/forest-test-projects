'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('WePayUserIdView', {
    WePayUserId: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'WePayUserIdView',
    
    timestamps: false,
    
  });

  return Model;
};

