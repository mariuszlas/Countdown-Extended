const { updateRooms, updatePlayers, sendQuestions, sendPlayers } = require('../ws/eventHandlers.js');
const helpers = require('../ws/helpers.js');

describe('event handlers', () => {

    it('updates the rooms array if there are no rooms with this no', async () => {
        jest.spyOn(helpers, 'fetchQuestions')
            .mockResolvedValue(['empty array']);
        const res = await updateRooms(
            ['room 1'], 132434, {gameSettings: 'settings'});
        expect(res.length).toBe(2)
    });

    it('does not update the rooms array if there is already a room with this no', async () => {
        jest.spyOn(helpers, 'fetchQuestions')
            .mockResolvedValue(['empty array']);
        const res = await updateRooms(
            [{ roomNo: 132434 }], 132434, {gameSettings: 'settings'});
        expect(res.length).toBe(1);
    });

    it('emits correct event with correct data', () => {
        const mockEmit = jest.fn();
        const mockSocket = { emit: mockEmit }
        const mockData = [{}, {}, {}]
        sendQuestions(mockSocket, [{ questions: mockData }]);

        expect(mockEmit).toHaveBeenCalledTimes(1);
        expect(mockEmit.mock.calls[0][0]).toBe('questions');
        expect(mockEmit.mock.calls[0][1]).toBe(mockData)
    });

    // it('emits new player object to clients in a room', () => {
    //     console.log(jest.fn())
    //     const mockEmit = jest.fn();
    //     const mockTo = jest.fn().mockImplementation(() => mockEmit);
    //     const mockSocket = { id: "mockId", to: mockTo };
    //     const player = updatePlayers(mockSocket, 213224, { username: 'test', host: true });
    //     epect(mockEmit).toHaveBeenCalledTimes(1);
    // });

    it('sends players data', () => {
        const mockEmit = jest.fn();
        sendPlayers({ emit: mockEmit },
            [{ gameSettings: 'test' }],
            [{roomNo: 123465, username: 'testUsername'}],
            123456,
            { username:'testUsername' });

        expect(mockEmit).toHaveBeenCalledTimes(1);
        expect(mockEmit.mock.calls[0][0]).toBe('players-in-room');
    });
});
