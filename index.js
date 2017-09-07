const auth = require('./lib/auth');

const oauthConsumerKey = process.env.OAUTH_CONSUMER_KEY;
const secretKey = process.env.CONSUMER_SECRET;

auth.getTokens(oauthConsumerKey, secretKey).then(data => data);
