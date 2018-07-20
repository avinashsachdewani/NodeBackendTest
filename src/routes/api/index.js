'use strict'
const express = require('express')
const router = express.Router()
const authRouter = require('./auth.route')
const peopleRouter = require('./people.route')

router.get('/status', (req, res) => { res.send({ status: 'OK' }) }) // api status

router.get('/', (req, res) => { res.send({ status: 'API Server is working find' }) }) // api status

router.use('/auth', authRouter) // mount auth paths

router.use('/people-like-you', peopleRouter)

module.exports = router
