import {AsyncStorage} from 'react-native';
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'MobileFlashcards:notifications';

let decks = {
	React: {
		title: 'React',
		questions: [
			{
				question: 'Is React a library for managing user interfaces?',
				answer: 'yes',
				answered: false,
				userAnswer: null
			},
			{
				question: 'Do you make Ajax requests in the render method in React?',
				answer: 'no',
				answered: false,
				userAnswer: null
				
			}
		],
		completedOn: null
	},
	JavaScript: {
		title: 'JavaScript',
		questions: [
			{
				question: 'Is a closure the combination of a function and the lexical environment within which that function was declared.?',
				answer: 'yes',
				answered: false,
				userAnswer: null
			}
		],
		completedOn: null
	}
	
};

const _getDecks = () =>
{
	return new Promise((res, rej) =>
	{
		setTimeout(() => res({...decks}), 500)
	})
};

const clearLocalNotifications = () =>
{
	return AsyncStorage.removeItem(NOTIFICATION_KEY)
	.then(Notifications.cancelAllScheduledNotificationsAsync)
}

const createNotifications = () =>
{
	return {
		title: 'Take your Quiz',
		body: 'Don\'t forget to complete at least one quiz today.',
		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: true
		}
	}
};

const setLocalNotifications = () =>
{
	AsyncStorage.getItem(NOTIFICATION_KEY)
	.then(JSON.parse)
	.then(data =>
	{
		if (data === null)
		{
			Permissions.askAsync(Permissions.NOTIFICATIONS)
			.then(({status}) =>
			{
				if (status === 'granted')
				{
					Notifications.cancelAllScheduledNotificationsAsync();
					
					let tomorrow = new Date();
					tomorrow.setDate(tomorrow.getDate() + 1);
					tomorrow.setHours(17);
					tomorrow.setMinutes(0);
					
					Notifications.scheduleLocalNotificationAsync(
						createNotifications(),
						{
							time: tomorrow,
							repeat: 'day'
						}
					)
					
					AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
				}
			})
		}
	})
	
}

export {_getDecks, clearLocalNotifications, createNotifications, setLocalNotifications};
