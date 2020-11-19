const express = require('express');
const Trucks = require('./trucksModel');

const restricted = require('../auth/restricted');



//new router
const router = express.Router();

//------------------------------


//need role checker here
//check if user is operator for edit methods


//-------------------------------

//endpoints
//url: PORT/api/trucks

router.get('/', restricted, (req,res)=>{

  Trucks.getTrucks()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        message:'Server error retrieving trucks list',
        errorName:err.name,
        errorMessage:err.message
      });
    })
});


//export
module.exports = router;
