const express = require('express');
const router = express.Router();
const { index, create } = require('../controllers/score.js');
const { addUsername } = require('../controllers/username.js');

router.get('/score', index);
router.post('/score', create);
router.post('/usernames', addUsername);

module.exports = router;
