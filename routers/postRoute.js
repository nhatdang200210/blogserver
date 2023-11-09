const express = require('express');

const {getPosts, createPost, updatePost, deletePost} = require( '../controllers/postController');

const {verifyToken} = require('../middlewares/verifyToken.js')
const { deletePost } = require('../controllers/postController');

const Router = express.Router();

Router.route('/').get(getPosts).post(createPost);
Router.route('/:posId').put(verifyToken, updatePost).delete(verifyToken, deletePost);
// Thêm route để xóa bài post khi admin click vào nút delete
router.delete('/:postId', postController.deletePost);

module.exports = Router;