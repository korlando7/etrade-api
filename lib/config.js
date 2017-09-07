module.exports = {
  extractToken(tokenStr) {
    return tokenStr.match(/[a-zA-Z0-9%]+(?=&)/g);
  }
};