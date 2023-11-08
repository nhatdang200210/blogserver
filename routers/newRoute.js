const express = require('express');

const {getNews, createNew} = require( '../controllers/newController');

const Router = express.Router();

Router.route('/').get(getNews).post(createNew);

module.exports = Router;