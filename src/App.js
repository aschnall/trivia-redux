import React, { Component } from 'react';
import { connect } from 'react-redux';

import StartMenu from './components/StartMenu';
import QuestionDisplay from './components/QuestionDisplay';
import { fetchQuestions } from './actions';

class App extends Component {

	componentDidMount() {
		this.props.fetchQuestions();
	}

	render() {
		const { start } = this.props;
		return (
			start ? <QuestionDisplay /> : 
							<StartMenu />
		);
	}
}

const mapStateToProps = state => {
	return { 
		start: state.updateState.start 
	}
}

export default connect(mapStateToProps, { fetchQuestions })(App);




