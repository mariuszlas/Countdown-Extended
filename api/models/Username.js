const db = require('../dbConfig/init.js');

class Username {
    constructor(data) {
        this.name = data.name;
    }

    static addUsername(name) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db.query(`INSERT INTO usernames (name) VALUES ($1) RETURNING name;`, [
                    name
                ]);
                const username = new Username(data.rows[0]);
                resolve(username);
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = Username;
