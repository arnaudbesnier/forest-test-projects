'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('youcaring_wp_term_taxonomy', {
    term_taxonomy_id: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    term_id: {
      type: DataTypes.INTEGER,
    },
    taxonomy: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    parent: {
      type: DataTypes.INTEGER,
    },
    count: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'youcaring_wp_term_taxonomy',
    underscored: true,
    timestamps: false,
    
  });

  return Model;
};

