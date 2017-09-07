const request = require('request');
const config = require('./config');

const url = 'https://etws.etrade.com/oauth/request_token';

const getTokens = (key, secret) => {
  return new Promise((resolve, reject) => {
    // headers for request
    const options = {
      url: url,
      oauth: {
        callback: 'oob',
        consumer_key: key,
        consumer_secret: secret
      }
    };

    // request to get oauth_token and oauth_token_secret
    request.get(options, (error, response) => {

      const res = response.body;

      if (res.indexOf('oauth_token_secret=') != -1) {
        // tokens are extracted from response.body using regex
        const tokenArr = config.extractToken((res));

        // extracted tokens are assigned to keys
        const tokens = {
          oauth_token: tokenArr[0],
          oauth_token_secret: tokenArr[1]
        };

        resolve(tokens);

      } else {
        reject(new Error(response.body));
      }
    });
  });
};


module.exports = {
  getTokens
};