const controller = require('../../../controllers/score.js');
const Score = require('../../../models/Score.js');

const mockJson = jest.fn();
const mockStatus = jest.fn(() => ({ send: jest.fn(), json: mockJson }));
const mockResponse = { status: mockStatus };

describe('scores controller', () => {

    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('index', () => {
        it('returns scores with a 200 status code', async () => {
            const mockScores = [{ username: 'test_username_1', score: 50 },
            { username: 'test_username_2', score: 70 }];
            jest.spyOn(Score, 'all', 'get').mockResolvedValue(mockScores);
            await controller.index(null, mockResponse);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(mockScores);
        });

        test('returns error with a 500 status code upon failure', async () => {
            try {
                jest.spyOn(Score, 'all', 'get').mockRejectedValueOnce('index error test');
                await controller.index(null, mockResponse);
            } catch (err) {

            }

            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({err: 'index error test'});
        })
    });

    describe('create', () => {
        it('returns the newly created record with 201 status code', async () => {
            const testObj = { username: 'test_username_1', score: 50 };
            const mockRequest = { body: testObj };
            jest.spyOn(Score, 'create').mockResolvedValue(testObj);
            await controller.create(mockRequest, mockResponse);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith(testObj);
        });

        test('returns error with a 422 status code upon failure', async () => {
            const testObj = { username: 'test_username_1', score: 50 };
            const mockRequest = { body: testObj };

            try {
                jest.spyOn(Score, 'create').mockRejectedValueOnce('create error test');
                await controller.create(mockRequest, mockResponse);
            } catch (err) {

            }

            expect(mockStatus).toHaveBeenCalledWith(422);
            expect(mockJson).toHaveBeenCalledWith({err: 'create error test'});
        })
    });
})
