const express = require('express');

const Posts = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  Posts.get()
    .then(post =>{
      res.status(200).json(post)
    })
    .catch(err =>{
      res.status(500).json({message: "Could not retrieve post"})
    })
});

router.get('/:id', validatePostId, (req, res) => {
  Posts.getById(req.params.id)
    .then(user =>{
      res.status(200).json(user)
    })
    .catch(err =>{
      res.status(500).json({message: "Error retrieving post data"})
    })
});

router.delete('/:id', validatePostId, (req, res) => {
  Posts.remove(req.params.id)
    .then(user =>{
      res.status(200).json(user)
    })
    .catch(err =>{
      res.status(500).json({message: "Post could not be removed"})
    })
});

router.put('/:id', validatePostId, (req, res) => {
  Posts.update(req.params.id, req.body)
    .then(user =>{
      res.status(200).json({message: "Post data updated successfully"})
    })
    .catch(err =>{
      res.status(500).json({message: "Post data could not be updated"})
    })
});

// custom middleware

function validatePostId(req, res, next) {
  Posts.getById(req.params.id)
    .then(post =>{
      if (post.id){
        req.post = post
        next()
      }
    })
    .catch(err =>{
      res.status(400).json({message: "Invalid post ID"})
    })
};

module.exports = router;