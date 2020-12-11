import axios from 'axios';

export const fetchQuestions = () => async(dispatch, getState) => {
    const response = await axios.get('https://opentdb.com/api.php?amount=10&category=9&type=multiple');
    dispatch({ type: 'FETCH_QUESTIONS', payload: response.data.results });
}

export const startGame = () => {
	return {
		type: 'START_GAME'
	};
};

export const endGame = () => {
	return {
		type: 'GAME_OVER'
	};
};

export const onChoiceSelect = () => {
	return {
		type: 'CHOICE_SELECTED'
	};
};


export const resetSelect = () => {
	return {
		type: 'RESET_SELECT'
	};
};

export const nextQuestion = () => {
	return {
		type: 'NEXT_QUESTION'
	};
};

export const onCorrect = () => {
	return {
		type: 'INCREMENT_SCORE'
	};
};