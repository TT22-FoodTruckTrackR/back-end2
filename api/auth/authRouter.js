const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/usersModel');
const {jwtSecret} = require('./secrets.js');
require('dotenv').config();

const router = express.Router();

// ENDPOINTS
//-------------------------------------------

/*  
user
{
  "username":"", string, unique, required
  "password":"", string, required
  "email":"", string, unique, required
  "location":1 integer, optional
}
*/


// //---------
// //TESTING: GET ALL USERS
// //---------

// //GET /api/auth/users
//---------------------------------
router.get('/users', (req, res, next)=>{
  Users.getUsers()
    .then(users => {
      res.status(200).json(users);
      next();
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({message:'Server error retrieving userlist'});
    })
});

router.get('/users/:id', (req, res, next)=>{
  const id = req.params.id;

  Users.getUserById(id)
    .then(user => {
      res.status(200).json(user);
      next();
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({message:'Server error retrieving user'});
    })

})

// //GET /api/auth/diners
//---------------------------------
router.get('/diners', (req, res, next)=>{

  // *** COPY OPERATORS HERE WHEN DONE ****

  next();
});



//---------
//REGISTER
//---------

//POST /api/auth/register/operators
//---------------------------------
router.post('/register/operators', (req, res, next)=>{
  const newUser = req.body;
  newUser.isOperator = 1;

  //theoretical env
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(newUser.password, rounds);
  newUser.password = hash;

  Users.addNewUser(newUser)
    .then(user => {
      res.status(201).json(user);
      next();
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({message:'Server error retrieving creating new user'});
    });
});


//POST /api/auth/register/diners
//---------------------------------
router.post('/register/diners', (req, res, next)=>{
  const newUser = req.body;
  newUser.isOperator = 0;

  //theoretical env
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(newUser.password, rounds);
  newUser.password = hash;

  Users.addNewUser(newUser)
    .then(user => {
      res.status(201).json(user);
      next();
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({message:'Server error retrieving creating new user'});
    });
});




//---------
//LOGIN
//---------

//POST /api/auth/login/
//---------------------------------
router.post('/login/', (req, res, next)=>{
  const pendingUser = req.body;

  Users.getUserByName(pendingUser.username)
    .then(dbUser=>{
      if(dbUser && bcrypt.compareSync(pendingUser.password, dbUser.password)){
        const token = makeJwt(dbUser);
        res.status(200).json({message:'Login successful!', token});
        next();
      }else {
        res.status(401).json({message:'Invalid credentials'});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({name:err.name, message:err.message, stack:err.stack});
    });

  // makeJwt(pendingUser);
  // next();
});



function makeJwt(user){

  const payload = {
    subject:user.id,
    username:user.username,
    role:user.role
  };

  const options = {
    expiresIn: '10 minutes'
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;