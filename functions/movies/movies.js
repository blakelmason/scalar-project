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

  const Movie = conn.model('Movie')

  const { httpMethod } = event

  if (httpMethod === 'GET') {
    if (isEmpty(event.queryStringParameters)) {
      const docs = await Movie.find({})
      return {
        statusCode: 200,
        body: JSON.stringify(docs),
      }
    } else {
      const doc = await Movie.findOne(event.queryStringParameters).populate('reviews')
      return {
        statusCode: 200,
        body: JSON.stringify(doc),
      }
    }
  }

  if (httpMethod === 'POST') {
    const doc = new Movie(JSON.parse(event.body))
    await doc.save()
    return {
      statusCode: 200,
    }
  }

  if (httpMethod === 'PUT') {
    const body = JSON.parse(event.body)
    const doc = await Movie.findOne({ _id: body._id })
    Object.assign(doc, body)
    await doc.save()
    return {
      statusCode: 200,
    }
  }

  if (httpMethod === 'DELETE') {
    await Movie.deleteOne({ _id: event.queryStringParameters._id })
    return {
      statusCode: 200,
    }
  }
}
