const Post = require('../models/Post');
// lay tat ca bai post
exports.getPosts = async (req,res,next)=>{
    try {
        const posts = await Post.find();
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
exports.createPost = async (req, res, next) => {
  try {
    const { title, content, author, attachment } = req.body;

    // Tạo một instance của Post model
    const newPost = new Post({
      title: title,
      content: content,
      author: author,
      attachment: attachment,
    });

    // Lưu bài Post mới vào cơ sở dữ liệu
    const savedPost = await newPost.save();

    res.status(200).json({
      status: 'success',
      data: { post: savedPost }
    });
  } catch (error) { 
    console.log("đã lọt vào đây"); 
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



// Hàm xóa bài post
exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    // Kiểm tra xem bài post tồn tại không
    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      const error = new Error('Bài post không tồn tại');
      error.statusCode = 404;
      throw error;
    }

    // Xóa bài post từ cơ sở dữ liệu
    await Post.findByIdAndRemove(postId);

    res.status(200).json({ message: 'Bài post đã được xóa thành công' });
  } catch (error) {
    next(error);
  }
};
