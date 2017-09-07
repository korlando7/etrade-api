module.exports = {
  extractToken(tokenStr) {
    return tokenStr.match(/[a-zA-Z0-9%]+(?=&)/g);
  },
  extractAuth(authorizationStr) {
    return authorizationStr.match(/"[a-zA-Z0-9%]+"/g);
  }
};
