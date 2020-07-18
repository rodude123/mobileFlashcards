import {ADD_CARD, ADD_DECK, CLEAR, RECEIVE_DECKS, RESET_DECK, SELECT_ANSWER, SET_COMPLETED} from './actions';

const decks = (state = {}, action) =>
{
	switch (action.type)
	{
		case RECEIVE_DECKS:
			return {
				...state,
				...action.decks
			}
		case ADD_DECK:
			return {
				...state,
				[action.deckId]: {
					title: action.title,
					questions: action.questions,
					completedOn: action.completedOn
				}
			}
		case ADD_CARD:
			return {
				...state,
				[action.deckId]: {
					...state[action.deckId],
					questions: state[action.deckId].questions.concat([{...action.cardObj}])
				}
			}
		case SELECT_ANSWER:
			return {
				...state,
				[action.deckId]: {
					...state[action.deckId],
					questions: state[action.deckId].questions.map((el, index) => index === action.questionIndex ? {
						...el,
						answered: true,
						userAnswer: action.answer
					} : el)
				}
			}
		case RESET_DECK:
			return {
				...state,
				[action.deckId]: {
					...state[action.deckId],
					questions: state[action.deckId].questions.map(el => ({...el, answered: false, userAnswer: null}))
				}
			}
		case SET_COMPLETED:
			return {
				...state,
				[action.deckId]: {
					...state[action.deckId],
					completedOn: action.date
				}
			}
		case CLEAR:
			return {}
			
		default:
			return state;
	}
};

export default decks;
