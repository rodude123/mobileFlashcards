import React from 'react';
import {Animated, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';

class Deck extends React.Component
{
	state = {
		bounceValue: new Animated.Value(0),
		opacity: new Animated.Value(0)
	}
	
	goToQuiz = () =>
	{
		const {route, navigation} = this.props;
		navigation.push('Quiz', {
			deckId: route.params.deckId
		})
	};
	
	goToNewCard = () =>
	{
		const {route, navigation} = this.props;
		navigation.navigate('Add Card', {
			deckId: route.params.deckId
		})
	};
	
	componentDidMount()
	{
		const {opacity, bounceValue} = this.state;
		// Animate Deck View when first loaded.
		Animated.parallel([
			Animated.timing(bounceValue, {toValue: 1, duration: 700}),
			Animated.timing(opacity, {toValue: 1, duration: 1200})
		])
		.start()
	}
	
	render()
	{
		const {route, decks, navigation} = this.props;
		const {bounceValue, opacity} = this.state;
		return (
			<Animated.View style={[styles.container, {transform: [{scale: bounceValue}], opacity}]}>
				<View style={styles.deckTextContainer}>
					<Text style={styles.deckNameText}>{`${decks[route.params.deckId].title} deck`}</Text>
					<Text style={{fontSize: 20}}>{`${decks[route.params.deckId].questions.length} card(s)`}</Text>
				</View>
				<View style={styles.btnsContainer}>
					<TouchableHighlight
						disabled={decks[route.params.deckId].questions.length <= 0}
						onPress={this.goToQuiz}
						style={[styles.buttons, {marginRight: 30}]}>
						<View>
							<Ionicons name="md-play" size={18} color="#fff"/>
							<Text style={styles.buttonText}>{`  Take Quiz`}</Text>
						</View>
					</TouchableHighlight>
					<TouchableHighlight
						onPress={this.goToNewCard}
						style={[styles.buttons, {marginLeft: 30}]}>
						<View>
							<MaterialIcons name="add-box" size={18} color="#fff"/>
							<Text style={styles.buttonText}>{`  Add Card`}</Text>
						</View>
					</TouchableHighlight>
				</View>
			</Animated.View>
		);
	}
};

// Access the following store state as props on this component.
const mapStateToProps = (state) => ({
	decks: state
});

// Style object.
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingHorizontal: 30
	},
	deckTextContainer: {
		// flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingHorizontal: 50,
		paddingVertical: 15,
		backgroundColor: '#FF7900',
		borderRadius: 5,
		marginVertical: 30,
	},
	deckNameText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#fff',
		paddingBottom: 3
	},
	btnsContainer: {
		paddingVertical: 15,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 30
	},
	buttons: {
		backgroundColor: '#CB782E',
		padding: 15,
		borderRadius: 5,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonText: {
		fontSize: 18,
		color: '#fff',
		textAlign: 'center',
	}
})

export default connect(mapStateToProps)(Deck);
