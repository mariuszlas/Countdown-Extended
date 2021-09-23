const axios = require('axios');
const { fetchQuestions } = require('../ws/helpers.js');

describe('fetchQuestions', () => {

    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    it('returns the questions on successful api query', async () => {
        const testData = { category: 'cat', difficulty: 'diff' };
        jest.spyOn(axios, 'get').mockResolvedValue({ data: { results: [{}, {}, {}] } } );
        const questions = await fetchQuestions(testData);

        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(questions).toHaveLength(3);
    })

    it('returns error upon unsuccessful api query', async () => {
        const testData = { category: 'cat', difficulty: 'diff' };
        jest.spyOn(axios, 'get').mockRejectedValue('Error fetching the questions');

        try {
            await fetchQuestions(testData);
        } catch (err) {
            expect(err).toEqual('Error fetching the questionss');
        }

        expect(axios.get).toHaveBeenCalledTimes(1);
    })
})
