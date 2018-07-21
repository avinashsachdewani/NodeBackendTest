'use strict'

const express = require('express')
const validator = require('express-validation')
const { search, create } = require('../../validations/people.validation')
const router = express.Router()
const peopleLikeYouController = require('../../controllers/peopleLikeYou.controller')

router.get('/', validator(search), peopleLikeYouController.peopleLikeYou)
router.post('/', validator(create), peopleLikeYouController.insertPeople)
router.post('/many', peopleLikeYouController.insertPeoples)
module.exports = router
