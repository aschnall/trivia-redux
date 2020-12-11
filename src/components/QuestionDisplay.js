import React, {Component} from 'react';
import { connect } from 'react-redux';
import { onChoiceSelect, onCorrect } from '../actions';

import NextQuestion from './NextQuestion';
import '../style/App.scss';

class QuestionDisplay extends Component {

	//onClick event handler from the choice buttons
	checkAnswer = event => {
		const { questions, questionIndex, onCorrect, onChoiceSelect } = this.props;
		//looping over answer choices to find the index of user's selected answer in the choices array
		const choices = document.getElementsByClassName('choice');
		let buttonIndex = 0;
		for (let i = 0; i < choices.length; i++) {
			if (event.target.textContent === choices[i].textContent) {
				buttonIndex = i;
				break;
			}
		}
		//grabbing value of answer property on the questions array which equls the index of the correct answer on the choices array
		const answerIndex = questions[questionIndex].answer;
		//check if user's answer equals correct answer - if so increment score with onCorrect action creator and disply button as correct
		if (event.target.textContent === questions[questionIndex].choices[answerIndex]) {
			choices[answerIndex].classList.add("choice-correct");
			onCorrect();
		}
		//if user's answer is incorrect use buttonIndex value to display chosen button as incorrect and answerIndex to display the correct answer button
		else {
			choices[buttonIndex].classList.add("choice-incorrect");
			choices[answerIndex].classList.add("choice-correct");
		}
		onChoiceSelect();
	}

	//mapping over the choices array to create a button for each choice to display on the screen
	renderChoices() {
		const { questions, questionIndex } = this.props;
		const choices = questions[questionIndex].choices.map((choice, index) => {
			return (
				<button
					dangerouslySetInnerHTML={{__html: choice}}
					className="choice"
					key={index}
					onClick={this.checkAnswer}
				>
				</button>
			);
		})
		return choices;
	}

	render() {
		const { questions, questionIndex, select } = this.props;
		return (
			<div className="container">
				<strong>Question: {questionIndex + 1} of {questions.length}</strong>
				<div className="question-display">
					<div className="question-text">
						<h1 dangerouslySetInnerHTML={{__html:questions[questionIndex].question}}></h1>
					</div>
					<div className="choice-wrapper">
						{this.renderChoices()}
					</div>
				</div>
				<div className="next">
					{select ? <NextQuestion  /> : ''}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		questionIndex: state.updateState.questionIndex,
		questions: state.questionReducer.questions,
		select: state.updateState.select
	};
};

export default connect(mapStateToProps, {onChoiceSelect, onCorrect })(QuestionDisplay);





