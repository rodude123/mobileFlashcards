import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {Platform} from 'react-native';
import MainStackNavigator, {NewDeckStack, SettingsStack} from './stackNavigator';
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme
} from '@react-navigation/native';
import './darkMode'

const Tab = Platform.OS === 'ios' ? createMaterialBottomTabNavigator() : createMaterialTopTabNavigator();

const TabNavigator = () => (
	<NavigationContainer theme={DefaultTheme} independent={true}>
		<Tab.Navigator
			initialRouteName="Decks"
			barStyle={{backgroundColor: 'white'}}
			tabBarOptions={{
				activeTintColor: '#FF7900',
				inactiveTintColor: 'gray',
				indicatorStyle: {
					backgroundColor: '#FF7900'
				}
			}}>
			<Tab.Screen name="Decks" component={MainStackNavigator}/>
			<Tab.Screen name="New Deck" component={NewDeckStack}/>
			<Tab.Screen name="Settings" component={SettingsStack}/>
		</Tab.Navigator>
	</NavigationContainer>
);

export default TabNavigator;
