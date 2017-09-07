const auth = require('./lib/auth');

const oauthConsumerKey = process.env.OAUTH_CONSUMER_KEY;
const secretKey = process.env.CONSUMER_SECRET;
const ticker = process.argv[2];


auth.getTokens(oauthConsumerKey, secretKey)
  .then(data => data)
  .then(data => auth.getQuote(data, ticker));
