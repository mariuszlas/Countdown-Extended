export const getQuestions = () => {
    return async dispatch => {
        try {
            const data = await fetch(`https://opentdb.com/api.php?amount=10&category=23&difficulty=hard&type=multiple`);
            const results = await data.json();
            const questions = results.results;
            dispatch({type: 'ADD_QUESTIONS', payload: questions});
        } catch (err) {
            console.error(err.message);
            dispatch({type: 'SET_ERROR', payload: err.message});
        }
    }
}

export const cleanString = str => {
    const cleanStr = str
        .replaceAll('&quot;', '"')
        .replaceAll('&#039;', "'")
        .replaceAll('&Eacute;', 'E')
        .replaceAll('&eacute;', 'e')
        .replaceAll('&amp;', ' & ')
        .replaceAll('&Uuml;', 'U')
        .replaceAll('&pi;', 'pi')
        .replaceAll('&shy;', '')
    return cleanStr
}
