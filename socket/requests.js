const https = require('https');

function getQuestions(settings) {
    return new Promise((res, rej) => {
        https.get(
            'https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple',
            response => {
                let data = '';

                response.on('data', chunk => {
                    data += chunk;
                });

                response.on('end', () => {
                    const questions = JSON.parse(data);
                    res(questions.results);
                });

                response.on('error', error => {
                    rej(error);
                });
            }
        );
    });
}

module.exports = { getQuestions };
