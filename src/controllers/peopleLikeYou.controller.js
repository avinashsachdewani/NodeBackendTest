'use strict'
const PeopleLikeYou = require('../models/peopleLikeYou.model')
const httpStatus = require('http-status')
const fs = require('fs')
const csv = require('csv-stream')
const through2 = require('through2')

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
    const people = new PeopleLikeYou(req.body)
    people.score = people.score === undefined ? (Math.random() * (1 - 0.1) + 0.1).toFixed(1) : people.score
    const savedPeople = await people.save()
    res.status(httpStatus.CREATED)
    res.send(`${savedPeople.name} inserted`)
  } catch (error) {
    next(error)
  }
}

exports.insertPeoples = async (req, res, next) => {
  try {
    var data = req.body
    for (const objPeople of data) {
      const people = new PeopleLikeYou(objPeople)
      people.score = people.score === undefined ? (Math.random() * (1 - 0.1) + 0.1).toFixed(1) : people.score
      await people.save()
    }
    res.status(httpStatus.CREATED)
    res.send('Records inserted successfully')
  } catch (error) {
    next(error)
  }
}
exports.insertPeopleCSV = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send('No files were uploaded.')
    }
    var peopleCSV = req.file
    var bulk = PeopleLikeYou.collection.initializeOrderedBulkOp()
    var counter = 0
    const stream = fs.createReadStream(peopleCSV.path)
      .pipe(csv.createStream({
        endLine: '\n',
        columns: ['name', 'age', 'latitude', 'longitude', 'monthlyIncome', 'experienced'],
        escapeChar: '"',
        enclosedChar: '"'
      }))
      .pipe(through2({ objectMode: true }, (row, enc, cb) => {
        row.score = (Math.random() * (1 - 0.1) + 0.1).toFixed(1)
        console.log(row)
        bulk.insert(row)
        counter++
        if (counter % 1000 === 0) {
          stream.pause()
          bulk.execute(function (err, result) {
            if (err) { cb(err, null) }
            bulk = PeopleLikeYou.collection.initializeOrderedBulkOp()
            stream.resume()
          })
        }
        cb(null, true)
      }))
      .on('data', data => {
        console.log(data)
      })
      .on('end', () => {
        if (counter % 1000 !== 0) {
          bulk.execute(function (err, result) {
            if (err) { throw err }
            res.status(httpStatus.CREATED)
            res.send(result)
          })
        }
      })
      .on('error', err => {
        throw err
      })
  } catch (error) {
    next(error)
  }
}
