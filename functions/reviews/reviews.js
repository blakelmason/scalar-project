const mongoose = require('mongoose')
const models = require('../../models')
const isEmpty = require('lodash/isEmpty')

let conn = null

const { DB_STRING } = process.env

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  if (conn === null) {
    conn = mongoose.createConnection(DB_STRING, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
    })
    await conn
    conn.model('Movie', models.Movie)
    conn.model('Review', models.Review)
  }

  const Review = conn.model('Review')
  const body = JSON.parse(event.body)
  const movieId = body.movie
  body.movie = mongoose.Types.ObjectId(movieId)
  const doc = new Review(body)
  await doc.save()

  const Movie = conn.model('Movie')
  const movieDoc = await Movie.findOne({ _id: movieId })
  movieDoc.reviews.push(doc._id)
  await movieDoc.save()
  return {
    statusCode: 200,
  }
}
