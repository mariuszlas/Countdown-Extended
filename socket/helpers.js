const axios = require('axios');

async function fetchQuestions(data) {
    try {
        const url = `https://opentdb.com/api.php?amount=10&category=${data.category}&difficulty=${data.difficulty}&type=multiple`;
        const result = await axios.get(url);
        return result.data.results;
    } catch (err) {
        return err;
    }
}

module.exports = { fetchQuestions };
