const mongoose = require('mongoose')
const crypto = require('crypto')
const Schema = mongoose.Schema

const User = new Schema({
  username: String,
  password: String,
  profile_image: String,
  name: String,
  phone: String,
  gender: String,
  age: Number
})

User.statics.create = function (username, password, profile_image = '', name = '', phone = '', gender = '', age = 0) {
  const secret = require('../config').secret
  const encrypted = crypto.createHmac('sha1', secret)
    .update(password)
    .digest('base64')

  const user = new this({
    username,
    password: encrypted,
    profile_image,
    name,
    phone,
    gender,
    age
  })
  
  return user.save()
}

User.statics.findOneByUsername = function (username) {
  return this.findOne({
    username
  }).exec()
}

User.methods.verify = function (password) {
  const secret = require('../config').secret
  const encrypted = crypto.createHmac('sha1', secret)
    .update(password)
    .digest('base64')
  return this.password === encrypted
}

module.exports = mongoose.model('User', User)