'use strict';

const express = require('express');

// Construct a router instance.
const router = express.Router();
const { Users, Courses } = require('./models');
const users = require('./models/users');

// Handler function to wrap each route.
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      // Forward error to the global error handler
      next(error);
    }
  }
}

//A /api/users GET route that will return all properties and values for the currently authenticated User along with a 200 HTTP status code.
router.get('/users', asyncHandler( async(req, res) => {
    const user = req.currentUser;
    res.status(200).json({
        firstName: users.firstName,
        lastName: users.lastName,
        emailAddress: users.emailAddress,
        password: users.password
    }); //.status(200)
}));

// A /api/users POST route that will create a new user, set the Location header to "/", and return a 201 HTTP status code and no content.
router.post('/users', asyncHandler(async(req, res) => {
    await Users.create(req.body);
    res.status(201).json({ 
        "location": '/',
        // "message": "Account successfully created!" //no content
    });
}));
// // Route that creates a new user.
// router.post('/users', asyncHandler(async (req, res) => {
//     try {
//       await User.create(req.body);
//       res.status(201).json({ "message": "Account successfully created!" });
//     } catch (error) {
//       if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
//         const errors = error.errors.map(err => err.message);
//         res.status(400).json({ errors });   
//       } else {
//         throw error;
//       }
//     }
//   }));

//Courses findAll()??