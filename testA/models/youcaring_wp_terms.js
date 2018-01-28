'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('youcaring_wp_terms', {
    term_id: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    name: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
    },
    term_group: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'youcaring_wp_terms',
    underscored: true,
    timestamps: false,
    
  });

  return Model;
};

