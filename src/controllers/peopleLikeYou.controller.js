'use strict'
const PeopleLikeYou = require('../models/peopleLikeYou.model')
const httpStatus = require('http-status')

exports.peopleLikeYou = async (req, res, next) => {
  try {
    const query = await PeopleLikeYou.generateQuery(req.query)
    const data = await PeopleLikeYou.find(query).sort('-score').select({ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 }).exec()
    res.status(httpStatus.OK)
    res.send(data)
  } catch (error) {
    return next(error)
  }
}
exports.insertPeople = async (req, res, next) => {
  try {
    var data = req.body
    for (const objPeople of data) {
      const people = new PeopleLikeYou(objPeople)
      await people.save()
    }
    res.status(httpStatus.CREATED)
    res.send('Records inserted successfully')
  } catch (error) {
    next(error)
  }
}
