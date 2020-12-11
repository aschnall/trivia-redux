import React from 'react';
import { connect } from 'react-redux';
import { startGame } from '../actions';

const StartMenu = ({score, questions, startGame, gameOver}) => {

//if gameOver is true display user's score and give them the option to restart the game
//if false display the initial main menu with title and option to start the game
	return (
		gameOver ? 
			<div className="menu-end">
				<div className="score">
					<h2>You scored {score}/{questions.length}</h2>
				</div>
				<div className="restart">
					<button onClick={startGame}>Play Again?</button>
				</div>
			</div> :
			<div className="menu">
				<div className="heading">
					<h1>General Knowledge Trivia</h1>
				</div>
				<div className="start">
					<button onClick={startGame}>Start</button>
				</div>
			</div>
	);
};

const mapStateToProps = state => {
	return {
		gameOver: state.updateState.gameOver,
		questions: state.questionReducer.questions,
		score: state.updateState.score
	}
}


export default connect(mapStateToProps, {startGame})(StartMenu);