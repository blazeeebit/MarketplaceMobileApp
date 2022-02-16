import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components';

const Card = styled.View`
	width: 40%;
	height: 150px;
	background-color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 20px;
`;

const CardText = styled.Text`
	font-weight: bold;
	font-size: 15px;
`;

const NavCards = (props) => {
	return (
		<Card>
			<CardText>{props.cardTitle}</CardText>
		</Card>
	);
};

export default NavCards;
