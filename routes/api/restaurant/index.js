const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = require('express').Router()
const controller = require('./controller')

router.post('/', upload.single('image'), controller.register)
router.get('/:id', controller.info)
router.get('/', controller.list)

module.exports = router