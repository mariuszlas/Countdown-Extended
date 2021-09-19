const express = require('express');
const router = express.Router();
const { index, create, fetch } = require('../controllers/score.js');

router.get('/score', index);
router.post('/score', create);
router.get('/question', fetch);

module.exports = router;
