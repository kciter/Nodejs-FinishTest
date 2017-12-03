const mongoose = require('mongoose')
const crypto = require('crypto')
const Schema = mongoose.Schema

const Restaurant = new Schema({
  title: String,
  phone: String,
  address: String,
  description: String,
  image: String
})

Restaurant.statics.create = function (title, phone, address, description, image) {
  const restaurant = new this({
    title,
    phone,
    address,
    description,
    image
  })
  
  return restaurant.save()
}

module.exports = mongoose.model('Restaurant', Restaurant)