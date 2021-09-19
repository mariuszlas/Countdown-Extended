const https = require('https');

const Score = require('../models/Score.js');

async function index(req, res) {
    try {
        const scores = await Score.all;
        res.status(200).json(scores);
    } catch (err) {
        res.status(500).json({ err });
    }
}

async function create(req, res) {
    try {
        const score = await Score.create(req.body);
        res.status(201).json(score);
    } catch (err) {
        res.status(422).json({ err });
    }
}

async function fetch(req, res) {
    try {
        https.get(
            'https://opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=multiple',
            response => {
                let data = '';

                response.on('data', chunk => {
                    data += chunk;
                });

                response.on('end', () => {
                    const result = JSON.parse(data);
                    res.status(200).json(result.results);
                });
            }
        );
    } catch (err) {
        res.json({ err });
    }
}

module.exports = { index, create, fetch };
