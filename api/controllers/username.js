const Username = require('../models/Username');

const addUsername = async (req, res) => {
    try {
        await Username.addUsername(req.body.name);
        res.status(201).json({ message: 'Username added successfully' });
    } catch (error) {
        res.status(400).json({ error: `The username '${req.body.name}' already exists. Try another one`});
    }
};

module.exports = { addUsername };
