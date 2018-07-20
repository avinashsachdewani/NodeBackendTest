'use strict'

const Joi = require('joi')

// User validation rules
module.exports = {
  create: {
    body: [{
      name: Joi.string().max(128).required(),
      age: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      monthlyIncome: Joi.number().required(),
      experienced: Joi.boolean().required(),
      score: Joi.number().required()
    }]
  },
  search: {
    query: {
      name: Joi.string().max(128),
      age: Joi.number(),
      latitude: Joi.number(),
      longitude: Joi.number(),
      monthlyIncome: Joi.number(),
      experienced: Joi.boolean(),
      score: Joi.number()
    },
    params: {
      name: Joi.string().max(128),
      age: Joi.number(),
      latitude: Joi.number(),
      longitude: Joi.number(),
      monthlyIncome: Joi.number(),
      experienced: Joi.boolean(),
      score: Joi.number()
    }
  }
}
