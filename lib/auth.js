const request = require('request');
const config = require('./config');

const oauth_consumer_key = process.env.OAUTH_CONSUMER_KEY;
const secret_key = process.env.CONSUMER_SECRET;

const self = module.exports = {

  getTokens: (key, secret) => {
    // headers for request
    const options = {
      url: 'https://etws.etrade.com/oauth/request_token',
      oauth: {
        callback: 'oob',
        consumer_key: key,
        consumer_secret: secret
      }
    };
    let tokens;

    // request to get oauth_token and oauth_token_secret
    request.get(options, (error, response) => {

      const res = response.body;
      console.log(response);

      if (res.indexOf('oauth_token_secret=') != -1) {
        // tokens are extracted from response.body using regex
        const tokenArr = config.extractToken((res));

        // extracted tokens are assigned to keys
        tokens = {
          oauth_token: tokenArr[0],
          oauth_token_secret: tokenArr[1]
        };

        console.log(tokens);
      } else {
        console.error(res);
      }
    });
  }
};