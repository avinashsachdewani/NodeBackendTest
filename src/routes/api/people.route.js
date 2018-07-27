'use strict'

const express = require('express')
const validator = require('express-validation')
const { search, create } = require('../../validations/people.validation')
const router = express.Router()
const peopleLikeYouController = require('../../controllers/peopleLikeYou.controller')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files/')
  },
  filename: function (req, file, cb) {
    let extension = file.originalname.split('.')
    cb(null, Date.now() + '.' + extension[extension.length - 1])
  }
})
let upload = multer({ storage: storage, limits: { fileSize: 10000000 } })

router.get('/', validator(search), peopleLikeYouController.peopleLikeYou)
router.post('/', upload.array(), validator(create), peopleLikeYouController.insertPeople)
// router.post('/array', upload.array(), validator(create), peopleLikeYouController.insertPeoples)
router.post('/csv', upload.single('file'), peopleLikeYouController.insertPeopleCSV)

module.exports = router
