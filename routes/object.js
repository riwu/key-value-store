const express = require('express');
const queries = require('../database/queries');

const router = express.Router();

router.get('/:key', (req, res, next) => {
  const { timestamp } = req.query;
  if (timestamp !== undefined && isNaN(timestamp)) {
    res.status(422).send('timestamp should be an integer');
    return;
  }
  queries
    .getObject(req.params.key, timestamp)
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
    .catch((e) => {
      if (e.code === 'ER_DUP_ENTRY') {
        res.status(409).send('There is already an entry with the same key and timestamp.');
      } else {
        next(e);
      }
    });
});

module.exports = router;
