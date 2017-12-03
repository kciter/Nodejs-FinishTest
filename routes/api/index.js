const router = require('express').Router()
const authMiddleware = require('../../middlewares/auth')
const auth = require('./auth')
const restaurant = require('./restaurant')
const user = require('./user')

router.use('/auth', auth)
router.use('/restaurant', restaurant)
router.use('/user', authMiddleware)
router.use('/user', user)

module.exports = router