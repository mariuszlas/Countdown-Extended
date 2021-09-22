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
});
