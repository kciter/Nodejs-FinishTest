const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = require('express').Router()
const controller = require('./controller')
const authMiddleware = require('../../../middlewares/auth')

router.use('/', authMiddleware)
router.get('/', controller.get)
router.put('/', upload.single('profile_image'), controller.update)

module.exports = router