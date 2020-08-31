const mongoose = require('mongoose')
const models = require('../../models')
const fs = require('fs')
const path = require('path')
const { Review } = require('../../models')

let conn = null

const { DB_STRING } = process.env

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  if (conn == null) {
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

  const Movie = conn.model('Movie')
  await Movie.deleteMany({})
  const moviesJson = fs.readFileSync(path.join(__dirname, 'movies.json'), 'utf8')
  await Movie.insertMany(JSON.parse(moviesJson))
  const movieDoc = await Movie.findOne({ title: 'Star Wars: The Rise of Skywalker' })

  const Review = conn.model('Review')
  await Review.deleteMany({})
  const reviewsArr = JSON.parse(fs.readFileSync(path.join(__dirname, 'reviews.json'), 'utf8'))
  await Promise.all(
    reviewsArr.map(async (item) => {
      const review = new Review({ ...item, movie: movieDoc._id })
      movieDoc.reviews.push(review._id)
      await review.save()
    })
  )

  await movieDoc.save()

  return {
    statusCode: 200,
    body: moviesJson,
  }
}
