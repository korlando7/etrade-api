const auth = require('./lib/auth');

const oauth_consumer_key = process.env.OAUTH_CONSUMER_KEY;
const secret_key = process.env.CONSUMER_SECRET;

auth.getTokens(oauth_consumer_key, secret_key).then(data => {
  console.log(data);
});