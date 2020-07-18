import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

const DeckListItem = ({title, cards, deckId}) =>
{
	const navigation = useNavigation();
	// Navigate to Deck route.
	const goToDeck = () =>
	{
		navigation.push('Deck', {
			deckId
		})
	};
	
	return (
		<TouchableHighlight
			onPress={goToDeck}
			style={styles.container}>
			<View>
				<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
					<MaterialCommunityIcons
						name="cards"
						size={35}
						color="#ffffff"
					/>
					<Text style={styles.deckNametext}>
						{` ${title}`}
					</Text>
				</View>
				<Text style={{fontSize: 20, paddingVertical: 3, alignSelf: 'center'}}>{`${cards} card(s)`}</Text>
			</View>
		</TouchableHighlight>
	);
};

// CSS styles object.
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#ff7900',
		paddingHorizontal: 50,
		paddingVertical: 15,
		borderRadius: 5,
		borderBottomColor: 'gray',
		borderBottomWidth: 1,
		marginBottom: 30,
		marginTop: 30,
		alignItems: 'center'
	},
	deckNametext: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#fff',
		paddingVertical: 3
	}
})

export default DeckListItem;
