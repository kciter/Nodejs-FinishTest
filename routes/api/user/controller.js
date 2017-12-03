const User = require ('../../../models/user')

exports.get = (req, res) => {
  let data = req.body
  
  User.findById(req.decoded._id)
    .then(user => {
      res.json(user)
    })
}

exports.update = (req, res) => {
  let data = req.body
  
  User.findByIdAndUpdate(req.decoded._id, { 
      name: data.name, 
      phone: data.phone,
      age: data.age,
      gender: data.gender,
      profile_image: req.file.path 
    }, (error, user) => {
      if (error) {
        return handleError(err)
      }
      res.json(user)
  })
}