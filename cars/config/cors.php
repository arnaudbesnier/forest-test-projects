<?php
//
// return [
//     /*
//      |--------------------------------------------------------------------------
//      | Laravel CORS
//      |--------------------------------------------------------------------------
//      |
//      | allowedOrigins, allowedHeaders and allowedMethods can be set to array('*')
//      | to accept any value.
//      |
//      */
//     'supportsCredentials' => false,
//     'allowedOrigins' => ['*'],
//     'allowedHeaders' => ['*'],
//     'allowedMethods' => ['*'],
//     'exposedHeaders' => [],
//     'maxAge' => 0,
//     'hosts' => [],
// ];

return [
  'supportsCredentials' => false,
  // 'allowedOrigins' => ["http://localhost:4200", "http://app.forestadmin.com", "https://app.forestadmin.com", "http://forestadmin-new.herokuapp.com", "https://forestadmin-new.herokuapp.com"],
  'allowedOrigins' => ['*'],
  'allowedHeaders' => ['*'],
  'allowedMethods' => ['POST', 'PUT', 'GET', 'DELETE'],
  'exposedHeaders' => [],
  'maxAge' => 0,
  'hosts' => [],
];
