const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  stars: Number,
  text: String,
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
})
