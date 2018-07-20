'use strict'
const PeopleLikeYou = require('../models/peopleLikeYou.model')
const httpStatus = require('http-status')

exports.peopleLikeYou = async (req, res, next) => {
  try {
    const data = await PeopleLikeYou.find(req.query).sort('-score').exec()
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
