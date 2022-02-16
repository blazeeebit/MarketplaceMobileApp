import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components';
import { firestoreDb, auth } from '../firebase';
import { collection, addDoc, getDocs, getDoc } from 'firebase/firestore';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const CardItem = styled.View`
	width: 100%;
	height: 300px;
	background-color: white;
	margin-bottom: 20px;
	border-radius: 35px;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding: 0 50px 0 15px;
`;

const ButtonCont = styled.View`
	width: 100%;
	margin-top: 25px;
	display: flex;
	justify-content: space-between;
	flex-direction: row;
`

const Title = styled.Text`
	font-size: 25px;
	color: #505050;
	font-weight: bold;
`
const Desc = styled.Text`
	font-size: 15px;
	color: #7E7E7E;
`

const Price = styled.Text`
	font-size: 30px;
	color: #505050;
	font-weight: bold;
`

const AddtoCart = styled.TouchableOpacity`
	background-color: orange;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 25px;
	border-radius: 10px;
`

const CartBtnText = styled.Text`
	font-size: 15px;
	color: white;
	font-weight: bold;
`

const Seller = styled.Text`
	font-size: 10px;
	color: #505050;
	font-weight: bold;
	margin-top: 20px;
`

const Singleitem = (props) => {
	const [ Res, setRes ] = useState([]); 

	const navigation = useNavigation();

	const state = useNavigationState((state) => state);

	const Home = state.routes[state.routes.length - 1].name == 'Home';

	const arr = [];

	const InsertInCart = async (name, price) => {


		 try {	 
			await addDoc(collection(firestoreDb, 'cart'), {
				name,
				price
			});
			Alert.alert('Item Added to Cart');
		 } catch (error) {
			 console.log(error);
		 }
	};

    // setRes(props.itemData);

	return (
        <>

        {!props.itemData ? <></> : props.itemData.map((obj, i) => (
            <CardItem key={i}>
                <Title>{obj.name}</Title>
                <Desc>{obj.description}</Desc>
				<ButtonCont>
				<Price>${obj.price}</Price>
				<AddtoCart onPress={() => InsertInCart(obj.name, obj.price)}>
					<CartBtnText>Add To Cart</CartBtnText>
				</AddtoCart>
				</ButtonCont>
				<Seller>Posted by {obj.seller}</Seller>
            </CardItem>
        ))}
        </>
	);
};

export default Singleitem;
