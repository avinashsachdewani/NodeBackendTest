'use strict'
const mongoose = require('mongoose')
// const httpStatus = require('http-status')
// const APIError = require('../utils/APIError')
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
  timestamps: true
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

module.exports = mongoose.model('peopleLikeYou', peopleSchema)
