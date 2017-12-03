const User = require('../../../models/user')
const jwt = require('jsonwebtoken')

exports.register = (req, res) => {
  const { 
    username,
    password,
    name,
    phone,
    gender,
    age
  } = req.body
  let newUser = null

  const create = (user) => {
    if (user) {
      throw new Error('username exists')
    } else {
      return User.create(username, password, req.file.path, name, phone, gender, parseInt(age))
    }
  }
  
  const respond = (user) => {
    res.json({
      message: 'registered successfully'
    })
  }
  
  const onError = (error) => {
    res.status(409).json({
      message: error.message
    })
  }
  
  User.findOneByUsername(username)
    .then(create)
    .then(respond)
    .catch(onError)
}

exports.login = (req, res) => {
  const { username, password } = req.body
  const secret = require('../../../config').secret
  
  const check = (user) => {
    if (!user) {
      // user does not exist
      throw new Error('login failed')
    } else {
      // user exists, check the password
      if (user.verify(password)) {
        // create a promise that generates jwt asynchronously
        const p = new Promise((resolve, reject) => {
          jwt.sign({
            _id: user._id,
            username: user.username,
            profile_image: user.profile_image,
            name: user.name,
            phone: user.phone,
            gender: user.gender,
            age: user.age
          }, secret, {
            expiresIn: '7d'
          }, (err, token) => {
            if (err) reject(err)
            resolve(token) 
          })
        })
        return p
      } else {
        throw new Error('login failed')
      }
    }
  }
  
  const respond = (token) => {
    res.json({
      message: 'logged in successfully',
      token
    })
  }
  
  const onError = (error) => {
    res.status(403).json({
      message: error.message
    })
  }
  
  User.findOneByUsername(username)
    .then(check)
    .then(respond)
    .catch(onError)
}

exports.check = (req, res) => {
  res.json({
    success: true,
    data: req.decoded
  })
}