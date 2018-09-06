const express = require('express');
const queries = require('../database/queries');

const router = express.Router();

router.get('/:key', (req, res, next) => {
  queries
    .getObject(req.params.key, req.query.timestamp)
    .then((value) => {
      if (value === undefined) {
        res.sendStatus(404);
      } else {
        res.send({ value });
      }
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  const objects = Object.entries(req.body);
  if (objects.length !== 1) {
    res.status(422).send('Request should contain exactly 1 key-value pair');
    return;
  }
  const [key, value] = objects[0];
  const obj = { key, value, timestamp: Math.round(Date.now() / 1000) };
  queries
    .postObject(obj)
    .then(() => res.send(obj))
    .catch(next);
});

module.exports = router;
