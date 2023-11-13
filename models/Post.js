const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      
    content: {
        type: String,
        required: [true, 'Post must have content'],
        trim: true
    },

    author:{
        type: String,
        required: [true, 'Post must have author'],
        trim: true
    }, 

    attachment:{
        type: String,
    },

    image:{
        type: String,
        required: true,
    },

    likeCount: {
        type: Number,
        default: 0,
      },

}, { timestamps: true})

const Post = mongoose.model('Post', postSchema);
module.exports = Post;