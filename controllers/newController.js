const News = require('../models/News');

exports.getNews = async (req,res,next)=>{
    try {
        const news = await News.find();
        res.status(200).json({
            status: 'success',  
            results: news.length,
            data: {news}
        })
      } catch (err) {
        res.status(500).json({ error: err });
     }
}

//tao bai post
exports.createNew = async (req, res, next) => {
    try {
      const { title, image, content, author } = req.body;
  
      // Create a new instance of the News model
      const newNews = new News({
        title,
        image,
        content,
        author
      });
  
      // Save the new News to the database
      const savedNews = await newNews.save();
  
      res.status(200).json({
        status: 'success',
        data: { news: savedNews }
      });
    } catch (error) { 
      console.error('Error creating news:', error);
      next(error);
    }
  };

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
