const mongoose = require('mongoose')
const models = require('../../models')
const fs = require('fs')
const path = require('path')

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
  }

  const seedJson = fs.readFileSync(path.join(__dirname, 'movies.json'), 'utf8')
  const Movie = conn.model('Movie')
  await Movie.deleteMany({})
  await Movie.insertMany(JSON.parse(seedJson))
  return {
    statusCode: 200,
    body: seedJson,
  }
}
