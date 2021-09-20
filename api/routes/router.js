const express = require('express');
const router = express.Router();
const { index, create } = require('../controllers/score.js');

router.get('/score', index);
router.post('/score', create);

module.exports = router;
