const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./secrets');


module.exports = (req,res,next) =>{
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({message:'Missing required token'});
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      console.log('decoded error ->', err);
      return res.status(401).json({message:'Bad token'});
    }

    console.log('decoded token->', decoded);
    req.decodedJwt = decoded;
    next();
  });
};