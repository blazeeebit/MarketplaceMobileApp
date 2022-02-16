import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import BottomNav from '../components/bottomNav';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import SettingOpt from '../components/settingOpt';

const MainArea = styled.SafeAreaView`
	flex: 1;
	${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

const NameView = styled.View`
	height: 30%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`

const TextUser = styled.Text`
	font-size: 25px;
	font-weight: bold;
`

const Settings = () => {

	const navigation = useNavigation();

	const user = auth.currentUser?.email.split('@')[0];

	return (
		<MainArea>
			<NameView>
				<TextUser>{user}</TextUser>
			</NameView>
			<SettingOpt/>
		</MainArea>
	);
};

export default Settings;
