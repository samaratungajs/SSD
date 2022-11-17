const router = require('express').Router()
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const path = require('path')
const { Router } = require('express')
const { File } = require('../models/file')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filkename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png']
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

let upload = multer({ storage, fileFilter })

router.route('/').post(upload.single('photo'), (req, res) => {
    console.log(req.body.photo)
  const username = req.body.username
  const photo = req.file.filename

  const newFileData = {
    username,
    photo
  }

  const file = new File(newFileData)

  file
    .save()
    .then(() => res.status(200).json({ file, message: "file is successfully addedd" }))
    .catch(err => res.ststus(400).json({message: err}))
})

module.exports = router;