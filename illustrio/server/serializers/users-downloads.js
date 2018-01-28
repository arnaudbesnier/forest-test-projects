'use strict';
var JSONAPISerializer = require('jsonapi-serializer');

function UsersDownloadsSerializer(users, total) {
  return new JSONAPISerializer('usersDownloads', users, {
    id: '_id',
    attributes: ['email','createdAt', 'themes', 'exportlogs'],
    themes: {
      ref: 'id',
      attributes: [],
      included: false,
      ignoreRelationshipData: true,
      relationshipLinks: {
        related: function (user) {
          return {
            href: '/forest/themes?filter[owner:_id]=' + user._id,
            meta: { count: user.themesCount }
          };
        }
      }
    },
    exportlogs: {
      ref: 'id',
      attributes: [],
      included: false,
      ignoreRelationshipData: true,
      relationshipLinks: {
        related: function (user) {
          return {
            href: '/forest/exportlogs?filter[user:_id]=' + user._id,
            meta: { count: user.downloadsCount }
          };
        }
      }
    },
    keyForAttribute: 'underscore_case',
    meta: { count: total }
  });
}

module.exports = UsersDownloadsSerializer;
