'use strict';

module.exports = (sequelize, DataTypes) => {
  let models = sequelize.models;

  var Model = sequelize.define('youcaring_wp_posts', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    post_author: {
      type: DataTypes.INTEGER,
    },
    post_date: {
      type: DataTypes.DATE,
    },
    post_date_gmt: {
      type: DataTypes.DATE,
    },
    post_content: {
      type: DataTypes.STRING,
    },
    post_title: {
      type: DataTypes.STRING,
    },
    post_excerpt: {
      type: DataTypes.STRING,
    },
    post_status: {
      type: DataTypes.STRING,
    },
    comment_status: {
      type: DataTypes.STRING,
    },
    ping_status: {
      type: DataTypes.STRING,
    },
    post_password: {
      type: DataTypes.STRING,
    },
    post_name: {
      type: DataTypes.STRING,
    },
    to_ping: {
      type: DataTypes.STRING,
    },
    pinged: {
      type: DataTypes.STRING,
    },
    post_modified: {
      type: DataTypes.DATE,
    },
    post_modified_gmt: {
      type: DataTypes.DATE,
    },
    post_content_filtered: {
      type: DataTypes.STRING,
    },
    post_parent: {
      type: DataTypes.INTEGER,
    },
    guid: {
      type: DataTypes.STRING,
    },
    menu_order: {
      type: DataTypes.INTEGER,
    },
    post_type: {
      type: DataTypes.STRING,
    },
    post_mime_type: {
      type: DataTypes.STRING,
    },
    comment_count: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: () => {
      }
    },
    tableName: 'youcaring_wp_posts',
    underscored: true,
    timestamps: false,
    
  });

  return Model;
};

