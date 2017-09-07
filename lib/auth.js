const request = require('request');
const qs = require('query-string');
const config = require('./config');

const getTokens = (key, secret) => new Promise((resolve, reject) => {
  // request url
  const url = 'https://etws.etrade.com/oauth/request_token';

  // headers for request
  const options = {
    url: url,
    oauth: {
      callback: 'oob',
      consumer_key: key,
      consumer_secret: secret,
    },
  };

    // request to get oauth_token and oauth_token_secret
  request.get(options, (error, response) => {
    const res = response.body;

    if (res.indexOf('oauth_token_secret=') !== -1) {
      // tokens are extracted from response.body using regex
      const tokenArr = config.extractToken((res));
      const auths = config.extractAuth(response.request.headers.Authorization);
      // extracted tokens are assigned to keys
      const tokens = {
        oauth_consumer_key: key,
        secret_key: secret,
        oauth_token: tokenArr[0],
        oauth_token_secret: tokenArr[1],
        oauth_nonce: auths[2],
        oauth_timestamp: auths[3],
        oauth_signature: auths[4]
      };

      resolve(tokens);
    } else {
      reject(new Error(response.body));
    }
  });
});

const getQuote = (data, symbol) => new Promise ((resolve, reject) => {
  const oauth = {
    oauth_consumer_key: data.oauth_consumer_key,
    oauth_token: data.oauth_token,
    oauth_token_secret: data.oauth_token_secret,
    oauth_nonce: data.oauth_nonce,
    oauth_timestamp: data.oauth_timestamp,
    oauth_signature: data.oauth_signature,
    oauth_signature_method: 'HMAC-SHA1'
  };
  const queryString = qs.stringify(oauth);
  const url = `https://etws.etrade.com/market/rest/quote/{${symbol}}?${queryString}`;

  request.get(url, (error, response) => {
    console.log(response);
    if(reponse) {
      resolve(response);
    } else {
      reject(response);
    }
  });
});

module.exports = {
  getTokens,
  getQuote
};
