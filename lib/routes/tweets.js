const { Router } = require('express');
const Tweet = require('../models/Tweet');
const ronSwanson = require('../middleware/ronSwanson');

module.exports = Router()
  .post('/', ronSwanson,  (req, res, next) => {
    const { handle, text } = req.body;
    if(req.query.random) {
      Tweet
        .create({
          handle,
          text: req.quote
        }).then(tweet => res.send(tweet)
        ).catch(next);
    } else {
      Tweet.create({
        handle,
        text
      }).then(tweet => res.send(tweet)
      ).catch(next);
    }
  })
  .get('/', (req, res, next) => {
    Tweet
      .find() 
      .select('-__v')
      .populate('handle', '-email -name -__v -_id')
      .then(tweets => res.send(tweets))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Tweet
      .findById(req.params.id)
      .select('-__v')
      .populate('handle', '-email -name -__v -_id')
      .then(tweet => res.send(tweet))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    const { text } = req.body;
    Tweet
      .findByIdAndUpdate(req.params.id, { text }, { new: true })
      .select('-__v')
      .populate('handle', '-email -name -__v -_id')
      .then(tweet => res.send(tweet))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Tweet
      .findByIdAndDelete(req.params.id)
      .then(() => res.send({ deleted: 1 }))
      .catch(next);
  });
