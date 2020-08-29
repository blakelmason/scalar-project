const mongoose = require('mongoose')

let conn = null

const { DB_STRING } = process.env

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  if (conn == null) {
    conn = mongoose.createConnection(DB_STRING, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
    })
    await conn
    conn.model(
      'Movie',
      new mongoose.Schema({
        title: String,
        year: Number,
        rated: String,
        released_on: String,
        genre: String,
        director: String,
        plot: String,
      })
    )
  }

  const Music = conn.model('Movie')
  const doc = await Music.find()
  return {
    statusCode: 200,
    body: JSON.stringify(doc),
  }
}
