import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components';
import BNavText from './bNavText';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const BottomTabNav = styled.View`
	height: 50px;
	position: absolute;
	bottom: 0;
	background-color: white;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
`;

const BottomNav = (props) => {
	const navigation = useNavigation();

	const state = useNavigationState((state) => state);

	if(!state){
		return null;
	}
	else{
	let routeName;

	const routes = state.routes;
	routeName = routes[routes.length - 1].name;

	const HandleAddProduct = () => {
		if(routeName != 'Add_Product'){
			navigation.navigate('Add_Product');
		}
	};

	const HandleSettings = () => {
		if(routeName != 'Settings'){
			navigation.navigate('Settings');
		}
	};

	const HandleHome = () => {
		if(routeName != 'Home'){
			navigation.navigate('Home');
		}
	};

	const BottomDivRenderer = () => {
		if (state) {
			return (
				<>
				{routeName == 'Login' || routeName == 'Register' ? (
					<></>
				) : (
					<BottomTabNav>
					<BNavText text="Market" TapFunction={HandleHome} />
					<BNavText text="Add Product" TapFunction={HandleAddProduct} />
					<BNavText text="Settings" TapFunction={HandleSettings} />
				</BottomTabNav>
				)}
				</>
			);
		}
	}

	return (
		<>
		{BottomDivRenderer()}
		</>
	);

}
};

export default BottomNav;
