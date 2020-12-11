import React from 'react';
import { connect } from 'react-redux';

import { nextQuestion, endGame, resetSelect, fetchQuestions } from '../actions';

const NextQuestion = ({nextQuestion, endGame, fetchQuestions, resetSelect, questionIndex, questions}) => {

	//increment questionIndex, removing selected choice classes, and resetting select piece of state
	//if final quetsion - fetch new questions and call endGame action creator in order to set state to handle end of game
	const onNextSelect = () => {
		nextQuestion();
		const buttons = document.getElementsByTagName('button');
		for (let i = 0; i < buttons.length; i++) {
			if (buttons[i].classList.contains('choice-correct')) {
				buttons[i].classList.remove('choice-correct')
			} else if (buttons[i].classList.contains('choice-incorrect')) {
				buttons[i].classList.remove('choice-incorrect')
			}
		}
		if (questionIndex < questions.length - 1) {
			resetSelect();
		} else {
			fetchQuestions();
			endGame();
		}
	}

	//display the next button after user selects an answer
	//if on last question, button will display with text of 'finish' rather than 'next question'
	return (
		questionIndex === questions.length - 1 ? 
			<button onClick={onNextSelect}>Finish</button> :
			<button onClick={onNextSelect} >
				Next Question
			</button> 

	);
}

const mapStateToProps = state => {
	return {
		questionIndex: state.updateState.questionIndex,
		questions: state.questionReducer.questions,
	}
}

export default connect(mapStateToProps, {nextQuestion, endGame, fetchQuestions, resetSelect})(NextQuestion);


