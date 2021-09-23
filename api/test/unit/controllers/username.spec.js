const { addUsername } = require('../../../controllers/username');
const Username = require('../../../models/Username');

const mockJSON = jest.fn();
const mockStatus = jest.fn(() => ({ json: mockJSON }));
const mockResponse = { status: mockStatus };

describe('Username controller', () => {
    beforeEach(() => jest.clearAllMocks());
    afterAll(() => jest.resetAllMocks());

    it('adds a username and returns a 201 status code', async () => {
        const mockBody = { name: 'username' };
        const mockRequest = { body: mockBody };

        jest.spyOn(Username, 'addUsername').mockResolvedValue({ mockBody });
        await addUsername(mockRequest, mockResponse);

        expect(mockJSON).toHaveBeenCalledWith({ message: 'Username added successfully' });
        expect(mockStatus).toHaveBeenCalledWith(201);
    });

    test('returns 400 status and error message upon failure', async () => {
        const mockBody = { name: 'username' };
        const mockRequest = { body: mockBody };

        try {
            jest.spyOn(Username, 'addUsername').mockRejectedValueOnce();
            await addUsername(mockRequest, mockResponse);
        } catch (err) {
            
        }

        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJSON).toHaveBeenCalledWith({error: `The username '${mockBody.name}' already exists. Try another one`});
    })
});
