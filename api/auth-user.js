'use strict';
const auth = require('basic-auth');
const bcypt = require('bcryptjs');
const { User } = require('./models');

// Middleware to authenticate the request using Basic Authentication.
exports.authenticateUser = async (req, res, next) => {
  let message = null;

  const credentials = auth(req);

  if (credentials) {
    const user = await User.findOne({ where: {emailAddress: credentials.name} });
    if (user) {
      const authenticated = bcypt
        .compareSync(credentials.pass, user.password);
        if (authenticated) {
          console.log(`Authentication successful for ${user.firstName}. `);

          req.currentUser = user;
        } else {
          message = `Authentication failed for ${user.firstName}`;
        }
    } else {
      message = `User not found for ${user.firstName}`;
    }
  } else {
    message = 'Auth header not found';
  }

  if (message) {
    console.warn(message);
    res.status(401).json({ message: 'Access Denied' });
  } else {
    next();
  }
}