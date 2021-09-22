const Score = require('../../../models/Score.js');
const pg = require('pg');

jest.mock('pg');
const db = require('../../../dbConfig/init.js');

describe('Score', () => {

    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('all', () => {
        it('resolves with a list of objects on successful databse query', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{}, {}, {}, {}] });
            const all = await Score.all;
            expect(all).toHaveLength(4);
        });

        test('returns error notifying failure of retrieval on unsuccessful db query', async () => {
            try {
                jest.spyOn(db, 'query').mockRejectedValueOnce();
                await Score.all;
            } catch (err) {
                expect(err).toEqual('Error in retrieving scores from database');
            }
        })
    });

    describe('create', () => {
        it('resolves with the newly created score on successful databse query', async () => {
            const testObj = { username: 'test_username', score: 200 };
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [testObj] });
            const result = await Score.create(testObj);
            expect(result).toBeInstanceOf(Score);
        });

        test('returns error notifying failure of creation on unsuccessful db query', async () => {
            const testObj = { username: 'test_username', score: 200 };

            try {
                jest.spyOn(db, 'query').mockRejectedValueOnce();
                await Score.create(testObj);
            } catch (err) {
                expect(err).toEqual('Could not add the score to database');
            }
        })
    });
})
