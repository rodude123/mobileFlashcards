const RECEIVE_DECKS = 'RECEIVE_DECKS';
const ADD_DECK = 'ADD_DECK';
const ADD_CARD = 'ADD_CARD';
const SELECT_ANSWER = 'SELECT_ANSWER';
const RESET_DECK = 'RESET_DECK';
const SET_COMPLETED = 'SET_COMPLETED';
const CLEAR = 'CLEAR'

const receiveDecks = (decks) => ({
	type: RECEIVE_DECKS,
	decks
});

// Thunk action creator.
const handleReceiveDecks = (data) =>
{
	return (dispatch) =>
	{
		dispatch(receiveDecks(data));
	}
};

// ADD DECK ACTION CREATOR.
const addDeck = (deckId, title, questions, completedOn) => ({
	type: ADD_DECK,
	deckId,
	title,
	questions,
	completedOn
});

// ADD CARD ACTION CREATOR.
const addCard = (cardObj, deckId) => ({
	type: ADD_CARD,
	cardObj,
	deckId
});

// SELECT ANSWER ACTION CREATOR.
const selectAnswer = (deckId, questionIndex, answer) => ({
	type: SELECT_ANSWER,
	deckId,
	questionIndex,
	answer
});

// RESET DECK ACTION CREATOR.
const resetDeck = (deckId) => ({
	type: RESET_DECK,
	deckId
});

// SET COMPLETED ACTION CREATOR.
const setCompleted = (deckId, date) => ({
	type: SET_COMPLETED,
	deckId,
	date
});

// CLEAR ACTION CREATOR
const clear = () => ({
	type: CLEAR
})


export {
	RECEIVE_DECKS,
	ADD_DECK,
	ADD_CARD,
	SELECT_ANSWER,
	RESET_DECK,
	SET_COMPLETED,
	CLEAR,
	handleReceiveDecks,
	addDeck,
	addCard,
	selectAnswer,
	resetDeck,
	setCompleted,
	clear
};
