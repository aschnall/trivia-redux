import { combineReducers } from 'redux';

const initialQuestionState = {
    questions: []
};

//reformatting the fetched data in and setting equal to questions piece of state
//data will be an array of objects - each object is a single question
//objects will have a question property with the question text, choices property which is an array of choices
//and answer property which is the index of the correct answer in the array of choices
const questionReducer = (state=initialQuestionState, action) => {
    switch(action.type) {
        case 'FETCH_QUESTIONS':
            const questions = action.payload.map((question) => {
                const formattedQuestions = {
                    question: question.question
                }
                const answerChoices = [...question.incorrect_answers];
                formattedQuestions.answer = Math.floor(Math.random() * 3);
                answerChoices.splice(formattedQuestions.answer, 0, question.correct_answer);
                formattedQuestions.choices = [];
                answerChoices.forEach((choice, index) => {
                    formattedQuestions.choices.push(choice);
                })
                return formattedQuestions;
            });
            return {...state, questions: questions};
        default:
            return state;
    };
};

const initialState = {
    start: false,
    gameOver: false,
    select: false,
    questionIndex: 0,
    score: 0
}

const updateState = (state=initialState, action) => {
    switch(action.type) {
        case 'START_GAME':
            return { ...state, start: true, score: 0 }
        case 'GAME_OVER':
            return {...state, gameOver: true, start: false, select: false, questionIndex: 0 }
        case 'CHOICE_SELECTED':
            return {...state, select: true };
        case 'RESET_SELECT':
            return { ...state, select: false };
        case 'NEXT_QUESTION':
            return {...state, questionIndex: state.questionIndex + 1 };
        case 'INCREMENT_SCORE':
            return {...state, score: state.score + 1 };
        default: 
            return state;
    }
}



export default combineReducers({
    questionReducer, 
    updateState
});

