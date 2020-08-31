const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  title: String,
  year: Number,
  rated: String,
  released_on: String,
  genre: String,
  director: String,
  plot: String,
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
})
