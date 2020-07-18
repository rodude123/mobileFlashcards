import React from 'react';
import {AsyncStorage, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import TabNavigator from './components/tabNavigator';
import reducer from './reducers';
import logger from './middleware/logger';
import {handleReceiveDecks} from './actions';
import {_getDecks, setLocalNotifications} from './_DATA';

const STORAGE_KEY = 'decks';

// const {store, persistor} = configureStore();
const store = createStore(reducer, applyMiddleware(thunk, logger));

// Have AsyncStorage data update each time store is updated.
store.subscribe(() =>
{
	AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()))
});


class App extends React.Component
{
	componentDidMount()
	{
		let data;
		AsyncStorage.getItem(STORAGE_KEY)
		.then(JSON.parse)
		.then(asyncDecks =>
		{
			if (Object.keys(asyncDecks).length > 0)
			{
				// Call thunk action creator to get initial decks data from asyncStorage and update store.
				store.dispatch(handleReceiveDecks(asyncDecks))
			}
			else
			{
				_getDecks()
				.then(decks =>
				{
					// Call thunk action creator to get initial decks data from db file and update store.
					store.dispatch(handleReceiveDecks(decks))
					
				})
				.catch(e => console.log('Unable to load data from local db', e));
			}
		})
		.catch(e =>
		{
			console.log('Unable to load Async data', e);
		});
		setLocalNotifications();
	}
	
	render()
	{
		return (
			<NavigationContainer>
				<Provider store={store}>
					<StatusBar backgroundColor="#FF7900" barStyle="light-content"/>
					<TabNavigator/>
				</Provider>
			</NavigationContainer>
		);
	}
};

export default App;

