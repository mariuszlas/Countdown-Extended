const Score = require('../../../models/Score.js');
const pg = require('pg');

jest.mock('pg');
const db = require('../../../dbConfig/init.js');

describe('Score', () => {

    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('all', () => {
        it('resolves with a list of objects on sucessful databse query', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{}, {}, {}, {}] });
            const all = await Score.all;
            expect(all).toHaveLength(4);
        });
    });

    describe('create', () => {
        it('resolves with the newly created score on sucessful databse query', async () => {
            const testObj = { username: 'test_username', score: 200 };
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [testObj] });
            const result = await Score.create(testObj);
            expect(result).toBeInstanceOf(Score);
        });
    });
})
