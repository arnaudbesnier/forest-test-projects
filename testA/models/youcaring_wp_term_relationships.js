'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('youcaring_wp_term_relationships', {
    object_id: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    term_taxonomy_id: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    term_order: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'youcaring_wp_term_relationships',
    underscored: true,
    timestamps: false,
    
  });

  return Model;
};

