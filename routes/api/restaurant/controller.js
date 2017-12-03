const Restaurant = require ('../../../models/restaurant')

exports.register = (req, res) => {
  const { 
    title,
    phone,
    address,
    description
  } = req.body
  
  Restaurant.create(title, phone, address, description, req.file.path)
    .then(restaurant => {
      res.json({
        message: 'registered successfully'
      })
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      })
    })
}

exports.info = (req, res) => {
  Restaurant.findById(req.params.id)
    .then(restaurant => {
      res.json(restaurant)
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      })
    })
}

exports.list = (req, res) => {
  Restaurant.find({})
    .then(restaurants => {
      res.json(restaurants)
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      })
    })
}