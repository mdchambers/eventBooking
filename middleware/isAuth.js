const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log('authenticating');
  const authHeader = req.get('Authorization');
  if(!authHeader) {
    // No authentication data in header
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(' ')[1]; // Authorization: Bearer token
  console.log(token);
  if(!token || token.trim() === ''){
    // Token not in authorization header, or is empty
    req.isAuth = false;
    return next();
  }
  // Verify token
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "somesupersecretkeythatyoucannotguess");
  } catch (error) {
    console.error("Token decoding failed");
    req.isAuth = false;
    return next();
  }
  console.log(decodedToken);
  // Check if decodedToken truthy
  if(!decodedToken) {
    req.isAuth = false;
    return next();
  }

  // At this point we're authenticated
  req.isAuth = true;
  req.userId = decodedToken.userId;
  return next()
}