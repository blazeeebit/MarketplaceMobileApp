import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import styled from 'styled-components';

const RegisterLink = styled.TouchableOpacity`padding: 10px;`;

const TextLink = styled.Text`
	font-size: 10px;
	color: white;
`;

const ErrorText = styled.Text`
	font-size: 15px;
	color: red;
	margin-bottom: 15px;
	font-weight: bold;
`;

const Login = () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ error, setError ] = useState('');

	const navigation = useNavigation();

	useEffect(() => {
		setEmail('');
		setPassword('');
		setError('');
		const unSub = onAuthStateChanged(auth, (user) => {
			if (user) {
				navigation.navigate('Home');
			}
		});
		return unSub;
	}, []);

	const NavRegister = () => {
		navigation.navigate('Register');
	};

	const handleLogin = () => {
		if ((!email, !password)) {
			setError('INPUTS MUST NOT BE EMPTY');
		} else {
			signInWithEmailAndPassword(auth, email, password)
				.then((userCredentials) => {
					const user = userCredentials.user;
					console.log(`Logged in as : ${user.email}`);
					setEmail('');
					setPassword('');
					setError('');
					navigation.navigate('Home');
				})
				.catch((error) => {
					console.log(error.message);
				});
		}
	};

	return (
		<SafeAreaView style={styles.container} behavior="padding">
			{!error ? <ErrorText /> : <ErrorText>{error}</ErrorText>}
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="Email"
					value={email}
					onChangeText={(text) => setEmail(text)}
					style={styles.input}
				/>
				<TextInput
					placeholder="Password"
					value={password}
					onChangeText={(text) => setPassword(text)}
					style={styles.input}
					secureTextEntry
				/>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity onPress={handleLogin} style={styles.button}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				<RegisterLink onPress={NavRegister}>
					<TextLink>Dont have an account? Sign Up</TextLink>
				</RegisterLink>
			</View>
		</SafeAreaView>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#D77FA1'
	},
	input: {
		width: '100%',
		backgroundColor: 'white',
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 10,
		marginTop: 5
	},
	button: {
		width: '100%',
		padding: 15,
		backgroundColor: '#548CFF',
		borderRadius: 10,
		marginBottom: 5,
		alignItems: 'center'
	},
	buttonSec: {
		width: '100%',
		padding: 15,
		backgroundColor: 'white',
		borderRadius: 10,
		backgroundColor: '#7900FF',
		alignItems: 'center'
	},
	buttonContainer: {
		width: '60%',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20
	},
	inputContainer: {
		width: '80%'
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold'
	}
});
