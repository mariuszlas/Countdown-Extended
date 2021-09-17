const db = require('../dbConfig/init.js');

class Score {
    constructor(data) {
        this.username = data.username;
        this.score = data.score;
    }

    static get all() {
        return new Promise(async (res, rej) => {
            try {
                const result = await db.query('SELECT * FROM scores;');
                const scores = result.rows.map(row => new Score(row));
                res(scores);
            } catch (err) {
                rej('Error in retrieving scores from database');
            }
        })
    }

    static create(body) {
        return new Promise(async (res, rej) => {
            try {
                const score = await db.query(`INSERT INTO scores (username, score)
                                            VALUES ($1, $2)
                                            RETURNING username, score;`,
                                            [body.username, body.score]);
                res(score.rows[0]);
            } catch (err) {
                rej('Could not add the score to database');
            }
        })
    }
}

module.exports = Score;
