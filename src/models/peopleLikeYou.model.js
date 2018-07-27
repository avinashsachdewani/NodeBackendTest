'use strict'
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const peopleSchema = new Schema({
  name: {
    type: String,
    maxlength: 50
  },
  age: {
    type: Number
  },
  monthlyIncome: {
    type: Number
  },
  experienced: {
    type: Boolean
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  score: {
    type: Number
  }

}, {
  timestamps: true,
  strict: false
})

peopleSchema.method({
  transform () {
    const transformed = {}
    const fields = ['id', 'name', 'age', 'createdAt', 'latitude', 'longitude', 'monthlyIncome', 'experienced', 'score']

    fields.forEach((field) => {
      transformed[field] = this[field]
    })

    return transformed
  }
})
peopleSchema.statics = {
  async generateQuery (params) {
    var query = {}
    for (const key in params) {
      if (key === 'name') {
        query[key] = { $regex: new RegExp(params[key], 'i') }
        continue
      }
      query[key] = params[key]
    }
    return query
  }
}

module.exports = mongoose.model('peopleLikeYou', peopleSchema)
