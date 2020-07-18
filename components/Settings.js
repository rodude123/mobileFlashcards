import React, {Component} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
// import {Entypo} from "@expo/vector-icons";
import './darkMode'
import {AsyncStorage} from 'react-native';
import {connect} from "react-redux";
import {clear} from "../actions";


class Settings extends Component
{
	render()
	{
		return (
			<View>
				<View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
					<Text style={{padding: 15, marginTop: 30, fontSize: 20}}>Rest decks and scores</Text>
					<TouchableHighlight style={styles.button} onPress={() => {AsyncStorage.clear(); this.props.dispatch(clear()); this.forceUpdate(); this.props.navigation.navigate("Decks")}}><Text>Reset</Text></TouchableHighlight>
				</View>
				<View style={{
					padding: 15,
					marginTop: 30,
					flexDirection: 'row',
					justifyContent: 'space-evenly',
					alignItems: 'center'
				}}>
					{/* tried to implement dark mode but it didn't really work
					<Text style={{fontSize: 20}}>Enable Dark Mode</Text>*/}
					{/*<TouchableHighlight style={[global.IS_DARK_MODE ? styles.darkModeBtn : styles.lightModeBtn]} onPress={() => {global.IS_DARK_MODE = !global.IS_DARK_MODE; this.forceUpdate(); console.log(global.IS_DARK_MODE)}}><Entypo name={'moon'}*/}
					{/*                                                                      color={global.IS_DARK_MODE ? 'white' : 'black'}*/}
					{/*                                                                      size={20}/></TouchableHighlight>*/}
				</View>
			</View>
		);
	}
}

// style object
const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 15,
		marginTop: 30,
		borderRadius: 5,
		backgroundColor: 'white',
		borderColor: '#FF7900',
		borderWidth: 1,
		width: 125
	}
});

const mapStateToProps = (state) => ({
	decks: state
});

export default connect(mapStateToProps)(Settings);
