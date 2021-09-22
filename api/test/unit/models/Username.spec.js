const Username = require('../../../models/Username');
const db = require('../../../dbConfig/init');

jest.mock('pg');

describe('Username model', () => {
    beforeEach(() => jest.clearAllMocks());
    afterAll(() => jest.resetAllMocks());

    it('creates an instance of the model', async () => {
        const testValue = { name: 'username' };
        const result = await Username.addUsername(testValue);
        jest.spyOn(db, 'query').mockResolvedValue({ rows: [testValue] });
        expect(result).toBeInstanceOf(Username);
    });

    test('returns error notifying failure of creation on unsuccessful db query', async () => {
        const testValue = { name: 'username' };

        try {
            jest.spyOn(db, 'query').mockRejectedValueOnce('Error occurred during creation');
            await Username.addUsername(testValue);
        } catch (err) {
            expect(err).toEqual('Error occurred during creation');
        }
    })
});
