import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default class Splash extends Component {
	render() {
		return(
			<View style={styles.wrapper}>
				<View style={styles.logoContainer}>
					<Image style={styles.logo} source={require('../Clops/src/images/Clops-w.png')} />
				</View>
				<View>
					<Text style={styles.subtitle}>MA Project</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: { 
		backgroundColor: '#2c3e50', 
		flex: 1, 
		justifyContent: 'center', 
		alignItems: 'center' 
	},
	logo: {
		width: 200,
		height: 200
	},
	subtitle: {
		color: 'white',
		fontWeight: '200'
	}
});