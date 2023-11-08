const express = require('express');
const {login,register, getCurrentUser} = require('../controllers/authController.js');
const { checkCurrentUser } = require('../middlewares/checkCurrentUser.js');

const Router = express.Router();

Router.route('/register').post(register);
Router.route('/login').post(login);
// Router.route('/').get(checkCurrentUser, getCurrentUser);

module.exports = Router;