const express = require('express');

const {getPosts, createPost, updatePost, deletePost} = require( '../controllers/postController');

const {verifyToken} = require('../middlewares/verifyToken.js')

const Router = express.Router();

Router.route('/').get(getPosts).post(createPost);
Router.route('/:posId').put(verifyToken, updatePost).delete(verifyToken, deletePost);

module.exports = Router;