import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {Feather} from '@expo/vector-icons';
import DeckListItem from './DeckListItem';
import {clearLocalNotifications, setLocalNotifications} from '../_DATA';

class DeckList extends React.Component
{
	
	componentDidUpdate()
	{
		setTimeout(() =>
		{
			const {decks} = this.props;
			const deckIds = Object.keys(decks);
			// Create new array with all questions that has a completed date of current day.
			const newArray = deckIds.filter(id => decks[id].completedOn === new Date().toLocaleDateString());
			console.log('deckList', newArray);
			// Check how many deck's (if any) were completed on today's date.
			if (newArray.length > 0)
			{
				console.log('notificaton cancelled for today')
				// Do not send notification on this day.
				clearLocalNotifications()
				// Set notification for next calendar day
				.then(setLocalNotifications)
			}
			else
			{
				// Do nothing i.e. notification will execute on this day as normal.
				console.log('notificaton will go off today')
			}
			
		}, 3000)
		
	}
	
	render()
	{
		const {decks} = this.props;
		// Array of all decks.
		const deckIds = Object.keys(decks);
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<Text style={styles.text}>Your Decks</Text>
				{deckIds.length > 0 ?
					deckIds.map(id => <DeckListItem
							key={id}
							title={decks[id].title}
							cards={decks[id].questions.length}
							deckId={id}/>
					) :
					<>
						<Text style={styles.noDeckText}>You currently have no decks, click below to add a new deck</Text>
						<TouchableHighlight onPress={() => {this.props.navigation.navigate("New Deck")}}>
							<Feather
								name="arrow-right-circle"
								size={65}
								color="#FF7900"
								style={styles.icon}/>
						</TouchableHighlight>
					</>
					
				}
			</ScrollView>
		);
	}
};

const mapStateToProps = (state) => ({
	decks: state
});

// Style object.
const styles = StyleSheet.create({
	container: {
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		marginHorizontal: 30,
		marginVertical: 30
	},
	text: {
		fontSize: 32,
		fontWeight: 'bold',
		marginBottom: 30,
		alignSelf: 'center'
	},
	noDeckText: {
		fontSize: 24,
		color: '#FF7900',
		alignSelf: 'center',
		textAlign: 'center'
	},
	icon: {
		alignSelf: 'center',
		marginTop: 15,
	}
});

export default connect(mapStateToProps)(DeckList);

