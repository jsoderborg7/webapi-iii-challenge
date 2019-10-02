const express = require('express');
const Users = require('./userDb');
const Posts = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user =>{
      res.status(201).json(user)
    })
    .catch(err =>{
      res.status(500).json({error: "There was a problem creating user."})
    })
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
  Users.get()
    .then(user =>{
      res.status(200).json(user)
    })
    .catch(err =>{
      res.status(500).json({message: "Could not retrieve user data"})
    })

});

router.get('/:id', validateUserId, (req, res) => {
  Users.getById(req.params.id)
    .then(user =>{
      res.status(200).json(user)
    })
    .catch(err =>{
      res.status(500).json({message: "Error retrieving user data"})
    })
});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then(user =>{
      res.status(200).json(user)
    })
    .catch(err =>{
      res.status(500).json({message: "User could not be removed"})
    })

});

router.put('/:id', validateUserId, (req, res) => {
  Users.update(req.params.id, req.body)
    .then(user =>{
      res.status(200).json({message: "User data updated successfully"})
    })
    .catch(err =>{
      res.status(500).json({message: "User data could not be updated"})
    })
});

//custom middleware

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then(user =>{
      if (user.id){
        req.user = user
        next()
      }
    })
    .catch(err =>{
      res.status(400).json({message: "Invalid user ID"})
    })
};

function validateUser(req, res, next) {
  if (!req.body){
    res.status(400).json({message: "Missing user data"})
  } else if (!req.body.name){
    res.status(400).json({message: "Missing required name field"})
  } else {
    next();
  }
};

function validatePost(req, res, next) {
  if (!req.body){
    res.status(400).json({message: "Missing post data"})
  } else if (!req.body.text){
    res.status(400).json({message: "Missing required text field"})
  } else{
    next();
  }
};

module.exports = router;
