const express = require('express');
const Users = require('./usersModel');

const restricted = require('../auth/restricted');



//new router
const router = express.Router();


// //GET /api/users
//---------------------------------
router.get('/users', (req, res, next)=>{
  Users.getUsers()
    .then(users => {
      res.status(200).json(users);
      next();
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        message:'Server error retrieving userlist',
        errorName:err.name,
        errorMessage:err.message,
      });
    })
});


//export
module.exports = router;
