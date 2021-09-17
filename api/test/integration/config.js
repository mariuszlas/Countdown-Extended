const request = require('supertest');
const fs = require('fs');
const { Pool } = require('pg');
const app = require('../../server.js');

const testSeed = fs.readFileSync(__dirname + '/test_seeds.sql').toString();

function restTestDB() {
    return new Promise(async (res, rej) => {
        try {
            const db = new Pool();
            await db.query(testSeed);
            res('Test database was reset');
        } catch (err) {
            rej(`Test database could not be reset: ${err}`)
        }
    });
}

global.request = request;
global.app = app;
global.restTestDB = restTestDB;
global.port = process.env.PORT || 5000;
