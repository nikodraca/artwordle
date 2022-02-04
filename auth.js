const request = require('request');

var client_id = 'bccaf18c63bc49dea48ba1fc57dfe812';
var client_secret = 'fa4886406bfa4e67bab8a99661b8e5ad';

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    Authorization: 'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64')
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    var token = body.access_token;
    console.log(token);
  }
});
