import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';

const SettingCard = styled.View`
	width: 100%;
	height: 10%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0 25px;
`;

const Button = styled.TouchableOpacity`
	backgroundColor: red;
	borderRadius: 10px;
	marginBottom: 5px;
	alignItems: center;
	justify-content: center;
	height: 50px;
	width: 150px;
`;

const BtnText = styled.Text`
	color: white;
	font-weight: bold;
`;

const SettingOpt = () => {
	const navigation = useNavigation();

	const HandleSignOut = () => {
		auth
			.signOut()
			.then(() => {
				navigation.push('Login');
			})
			.catch((error) => {
				alert(error.message);
			});
	};
	return (
		<SettingCard>
			<Text>Log Out of App</Text>
			<Button onPress={HandleSignOut}>
				<BtnText>Logout</BtnText>
			</Button>
		</SettingCard>
	);
};

export default SettingOpt;
