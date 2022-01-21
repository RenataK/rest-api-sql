'use strict';

const express = require('express');

// Construct a router instance.
const router = express.Router();
const { User, Course } = require('./models');
const { authenticateUser } = require('./middleware/auth-user');
const { asyncHandler } = require('./middleware/async-handler');
const bcrypt = require('bcryptjs');

//A /api/users GET route that will return all properties and values for the currently authenticated User along with a 200 HTTP status code.
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
    const user = req.currentUser;
    console.log(user);
    res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        password: user.password,
        userId: user.userId
    });
}));

// A /api/users POST route that will create a new user, set the Location header to "/", and return a 201 HTTP status code and no content.
// Route that creates a new user.
router.post('/users', asyncHandler(async (req, res) => {
    try {
      await User.create(req.body);
      res.status(201).json({
        location: "/",
        "message": "Account successfully created!" //no content
      });
    } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });   
      } else {
        throw error;
      }
    }
  }));

//Courses

//A /api/courses GET route that will return all courses including the User associated with each course and a 200 HTTP status code.


//A /api/courses/:id GET route that will return the corresponding course including the User associated with that course and a 200 HTTP status code.

//A /api/courses POST route that will create a new course, set the Location header to the URI for the newly created course, and return a 201 HTTP status code and no content.

//A /api/courses/:id PUT route that will update the corresponding course and return a 204 HTTP status code and no content.

//A /api/courses/:id DELETE route that will delete the corresponding course and return a 204 HTTP status code and no content.

//exporting Router
module.exports = router;
