'use strict'

const express = require('express')
const validator = require('express-validation')
const { search } = require('../../validations/people.validation')
const router = express.Router()
const peopleLikeYouController = require('../../controllers/peopleLikeYou.controller')

router.get('/', validator(search), peopleLikeYouController.peopleLikeYou)
router.post('/', peopleLikeYouController.insertPeople)

module.exports = router
