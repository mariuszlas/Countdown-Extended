const axios = require('axios');

const { fetchQuestions } = require('../helpers.js');

jest.mock('axios');

describe('fetchQuestions', () => {

    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());
    
    test('returns the questions on successful api query', async () => {
        const testData = {category: 'cat', difficulty: 'diff'};

        jest.spyOn(axios, 'get').mockResolvedValue({ data: { results: [{}, {}, {}] } } );
        // axios.get.mockResolvedValue({ data: { results: [{}, {}, {}] } });

        const questions = await fetchQuestions(testData);

        console.log(questions);

        expect(axios.get).toHaveBeenCalled();
        expect(questions).toHaveLength(4);
    })
})
