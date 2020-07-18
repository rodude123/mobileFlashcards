import React, {Component} from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';
import {FontAwesome, MaterialIcons} from '@expo/vector-icons';
import {addCard} from '../actions';

class NewQuestion extends Component
{
	// Component State.
	state = {
		question: '',
		answer: ''
	};
	
	// Perform this when text in question InputText field changes.
	onQuestionChange = (input) =>
	{
		const question = input.trimStart();
		// Update component state question property value to text in input field.
		this.setState(() => ({
			question
		}));
	};
	
	// Perform this when yes answer button is pressed.
	onYesSelect = () =>
	{
		this.setState((prevState) => ({
			answer: prevState.answer === 'yes' ? prevState.answer : 'yes'
		}));
	};
	
	// Perform this when no answer button is pressed.
	onNoSelect = () =>
	{
		this.setState((prevState) => ({
			answer: prevState.answer === 'no' ? prevState.answer : 'no'
		}));
	};
	
	onCardSubmit = () =>
	{
		const {question, answer} = this.state;
		const {deckId} = this.props;
		// Check whether both input fields are not empty.
		if (question !== '' && answer !== '')
		{
			// if they are not empty, create a question object.
			const questionObj = {
				question,
				answer,
				answered: false
			};
			// Dispacth action to add question object to that's deck's question array.
			this.props.dispatch(addCard(questionObj, deckId));
			// Reset component state values to empty strings.
			this.setState(() => ({
				question: '',
				answer: ''
			}))
			// Redirect to the previous Deck view.
			this.props.navigation.navigate('Deck', {
				deckId
			});
		}
	};
	
	render()
	{
		const {question, answer} = this.state;
		return (
			<KeyboardAvoidingView
				behavior="height"
				style={styles.container}>
				<Text
					style={styles.headerText}>{`Add new card to the ${this.props.decks[this.props.deckId].title} deck`}</Text>
				<View style={{marginBottom: 30}}>
					<TextInput
						value={question}
						onChangeText={(text) => this.onQuestionChange(text)}
						placeholder="Please enter question in a yes/no format."
						style={styles.textInput}/>
				</View>
				<View style={styles.ansContainer}>
					<Text style={styles.ansText}>Please select the correct answer to your new question from the two
						choices below</Text>
					<TouchableHighlight
						onPress={this.onYesSelect}
						style={[styles.ansButton, {
							backgroundColor: answer === 'yes' ? '#CB782E' : '#F2F2F2',
							borderTopWidth: answer === 'yes' ? 0 : 1,
							borderRightWidth: answer === 'yes' ? 0 : 1,
							borderBottomWidth: answer === 'yes' ? 0 : 1,
							borderLeftWidth: answer === 'yes' ? 0 : 1,
							
						}]}>
						<View>
							<FontAwesome name="thumbs-up" size={18} color={answer === 'yes' ? '#fff' : 'black'}/>
							<Text
								style={{fontSize: 18, color: answer === 'yes' ? '#fff' : 'black'}}>{`  Yes`}</Text>
						</View>
					</TouchableHighlight>
					<TouchableHighlight
						onPress={this.onNoSelect}
						style={[styles.ansButton, {
							backgroundColor: answer === 'no' ? '#CB782E' : '#F2F2F2',
							borderTopWidth: answer === 'no' ? 0 : 1,
							borderRightWidth: answer === 'no' ? 0 : 1,
							borderBottomWidth: answer === 'no' ? 0 : 1,
							borderLeftWidth: answer === 'no' ? 0 : 1,
							marginTop: 15
							
						}]}>
						<View>
							<FontAwesome name="thumbs-down" size={18} color={answer === 'no' ? '#fff' : 'black'}/>
							<Text style={{fontSize: 18, color: answer === 'no' ? '#fff' : 'black'}}>{`  No`}</Text>
						</View>
					</TouchableHighlight>
				</View>
				<TouchableHighlight
					onPress={this.onCardSubmit}
					style={[styles.button, {
						backgroundColor: question === '' || answer === '' ? '#F2F2F2' : '#CB782E',
						borderTopWidth: question === '' || answer === '' ? 1 : 0,
						borderRightWidth: question === '' || answer === '' ? 1 : 0,
						borderBottomWidth: question === '' || answer === '' ? 1 : 0,
						borderLeftWidth: question === '' || answer === '' ? 1 : 0,
						
					}]}>
					<View>
						<MaterialIcons name="add-box" size={18}
					                      color={question === '' || answer === '' ? '#FF7900' : '#fff'}/>
						<Text style={[styles.buttonText, {color: question === '' || answer === '' ? '#FF7900' : '#fff'}]}>{`  Add Card`}</Text>
					</View>
				</TouchableHighlight>
			</KeyboardAvoidingView>
		);
	}
};

const mapStateToProps = (state, ownProps) => ({
	decks: state,
	deckId: ownProps.route.params.deckId
});

// style object.
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginHorizontal: 30,
		marginVertical: 30
	},
	headerText: {
		fontSize: 32,
		marginBottom: 30,
		textAlign: 'center',
		fontWeight: 'bold'
	},
	textInput: {
		borderBottomWidth: 1,
		borderTopWidth: 1,
		borderRightWidth: 1,
		borderLeftWidth: 1,
		borderBottomColor: '#FF7900',
		borderTopColor: '#FF7900',
		borderRightColor: '#FF7900',
		borderLeftColor: '#FF7900',
		padding: 10,
		borderRadius: 5,
		fontSize: 18,
		color: '#CB782E'
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
		marginTop: 30,
		borderRadius: 5,
		borderBottomColor: '#FF7900',
		borderTopColor: '#FF7900',
		borderRightColor: '#FF7900',
		borderLeftColor: '#FF7900'
	},
	buttonText: {
		fontSize: 18,
	},
	ansText: {
		fontSize: 18,
		textAlign: 'center',
		marginBottom: 30
	},
	ansContainer: {
		alignSelf: 'center',
		alignItems: 'center'
		
	},
	ansButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: 90,
		padding: 15,
		borderRadius: 5,
		
	},
});

export default connect(mapStateToProps)(NewQuestion);
