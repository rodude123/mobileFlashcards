import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Deck from './Deck';
import Quiz from './Quiz';
import NewQuestion from './NewQuestion';
import DeckList from './DeckList';
import NewDeck from './NewDeck';
import Settings from "./Settings";

const Stack = createStackNavigator();

const MainStackNavigator = () => (
	<Stack.Navigator
		initialRouteName="Home">
		<Stack.Screen name="Home" component={DeckList}/>
		<Stack.Screen
			name="Deck"
			component={Deck}
			options={({route}) => ({title: `${route.params.deckId} Deck`})}/>
		<Stack.Screen
			name="Quiz"
			component={Quiz}
			options={({route}) => ({title: `${route.params.deckId} Quiz`})}/>
	</Stack.Navigator>
);

const NewDeckStack = () => (
	<Stack.Navigator
		initialRouteName="Add Deck">
		<Stack.Screen name="Add Deck" component={NewDeck}/>
		<Stack.Screen name="Add Card" component={NewQuestion}/>
	</Stack.Navigator>
)

const SettingsStack = () => (
	<Stack.Navigator initialRouteName="Settings">
		<Stack.Screen name="Settings" component={Settings}/>
	</Stack.Navigator>
)

export {MainStackNavigator as default, NewDeckStack, SettingsStack};
