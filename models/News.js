const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  dateCreate: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
  },
  content: {
    type: String,
    required: [true, 'News must have content'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'News must have an author'],
    trim: true
  }
}, { timestamps: true });

const News = mongoose.model('News', newsSchema);
module.exports = News;