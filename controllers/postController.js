const Post = require('../models/Post');
///lay bai post
exports.getPosts = async (req,res,next)=>{
    try {
        const posts = await Post.find({}).populate('author','name').select('content createAt');
        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: {posts}
        })
      } catch (err) {
        res.status(500).json({ error: err });
     }
}

//tao bai post
exports.createPost = async (req,res,next)=>{
    try {
        const {userId} = req.user;

        const post = await Post.create({...req.body,author:userId});
        res.status(200).json({
            status: 'success',
            data: {post}
        })
      } catch (error) {
        next (error);
     }
}

//update post
exports.updatePost = async (req,res,next)=>{
    try {
        const {postId} = req.params;

        const post = await Post.findByIdAndUpdate(postId,{...req.body},{new: true, runValidator: true});
        res.status(200).json({
            status: 'success',
            data: {post}
        })
      } catch (error) {
        next(error);
     }
}

//delete post
exports.deletePost = async (req,res,next)=>{
    try {
        const {postId} = req.params;

        await Post.findByIdAndUpdate(postId);
        res.status(200).json({
            status: 'success',
            message: 'Post has been deleted'
        })
      } catch (error) {
        next(error);
     }
}
