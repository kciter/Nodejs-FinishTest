const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = require('express').Router()
const controller = require('./controller')
const authMiddleware = require('../../../middlewares/auth')

router.post('/register', upload.single('profile_image'), controller.register)
router.post('/login', controller.login)

router.use('/check', authMiddleware)
router.get('/check', controller.check)

module.exports = router