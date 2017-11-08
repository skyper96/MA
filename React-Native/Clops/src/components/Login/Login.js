import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import LoginForm from './LoginForm';

export default class Login extends Component {
	render() {
		return(
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View style={styles.logoContainer}>
					<Image style={styles.logo} source={require('images/Clops-w.png')} />
				</View>
				<View style={styles.formContainer}>
					<LoginForm />
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: '#34495e'
	},
	logoContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flexGrow: 1
	},
	logo: {
		width: 100,
		height: 100
	},
	loginFormContainer: {
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.7)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#2c3e50',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700'
    }
});