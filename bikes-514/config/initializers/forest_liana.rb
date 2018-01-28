ForestLiana.env_secret = Rails.application.secrets.forest_env_secret
ForestLiana.auth_secret = Rails.application.secrets.forest_auth_secret

ForestLiana.integrations = {
  intercom: {
    access_token: 'dG9rOjhhYTk3OTk2X2U3NzZfNGM1NV9hMTUwX2I5ODA0Y2JhNTA5ZDoxOjA=',
    mapping: 'User'
  },
  stripe: {
    api_key: 'sk_test_oB5R0wJWCUml7GenGvwf4u7s',
    mapping: ['User.email']
  }
}
