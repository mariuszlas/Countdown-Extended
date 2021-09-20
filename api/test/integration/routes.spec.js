describe('scores endpoints', () => {
    let api;

    beforeAll(async () => {
        api = app. listen(5000, () => console.log('Test api running on port 5000'))
    });

    beforeEach(async () => {
        await restTestDB();
    });

    afterAll(done => {
        console.log('Stopping the test api');
        api.close(done);
    });

    it('returns all scores for the GET route', async () => {
        const res = await request(api).get('/score');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(3);
    });

    it('adds a username and score to database for the POST route', async () => {
        const testObj = {
            username: "test_username",
            score: 100
        }
        const res = await request(api).post('/score').send(testObj);
        expect(res.statusCode).toBe(201);
        expect(res.body).toStrictEqual(testObj);
    });
})
