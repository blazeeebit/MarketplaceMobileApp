import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components';

const TabBtn = styled.Text`
	padding: 10px 15px;
	background-color: #d77fa1;
	border-radius: 20px;
	color: white;
	fontWeight: bold;
`;

const BNavText = (props) => {
	return <TabBtn onPress={props.TapFunction}>{props.text}</TabBtn>;
};

export default BNavText;
