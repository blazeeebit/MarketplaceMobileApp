import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList, Alert } from 'react-native';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { firestoreDb, auth } from '../firebase';

const MainArea = styled.SafeAreaView`
	flex: 1;
	${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
	flex-direction: column
	align-items: center;
	background-color: #d77fa1;
	padding: 50px 10px;
`;

const CartCard = styled.View`
	width: 100%;
	background-color: white;
	border-radius: 20px;
	padding: 50px 30px;
	margin-bottom: 30px;
`;

const CartEmpty = styled.Text`
	font-size: 20px;
	color: #505050;
	font-weight: bold;
`;

const CartFilled = styled.View`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const CartDetails = styled.Text`
	font-size: 20px;
	color: #505050;
	font-weight: bold;
	margin-bottom: 10px;
`;

const PriceCont = styled.View`
	width: 100%;
	background-color: white;
	border-radius: 20px;
	padding: 20px 30px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const CheckOutBtn = styled.TouchableOpacity`
	padding: 10px 25px;
	background-color: blue;
	border-radius: 15px;
	margin-top: 20px;
`;

const EmptyBtn = styled.TouchableOpacity`
	padding: 10px 25px;
	background-color: red;
	border-radius: 15px;
	margin-top: 20px;
`;

const CheckOutText = styled.Text`
	color: white;
	font-size: 15px;
`;

const TotalPriceText = styled.Text`
	color: #505050;
	font-size: 15px;
	font-weight: bold;
`;

const CartBtnCont = styled.View`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
`;

const Cart = () => {
	const navigation = useNavigation();

	const [ Res, setRes ] = useState([]);

	const [ order, setOrder ] = useState([]);

	useEffect(() => {
		ReadData();
	}, []);

	const arr = [];
	const orderArr = [];
	const cartIdArr = [];

	const ReadData = async () => {
		const querySnapshot = await getDocs(collection(firestoreDb, 'cart'));
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc
			cartIdArr.push(doc.id);
			arr.push(doc.data());
		});
		setRes(arr);
		setOrder(cartIdArr);
	};

	const SumPrices = () => {
		const SumArr = [];
		Res.map((obj, i) => {
			let priceStringToFloat = parseFloat(obj.price);
			SumArr.push(priceStringToFloat);
			orderArr.push(obj);
		});
		const total = SumArr.reduce(Sum);
		return total.toFixed(2);
	};

	const Sum = (total, num) => {
		return total + num;
	};

	const HandleOrderDoc = async () => {
		const docRef = await addDoc(collection(firestoreDb, 'orders'), {
			orderArr
		});

		for (var i = 0; i <= order.length - 1; i++) {
			await deleteDoc(doc(firestoreDb, 'cart', order[i]));
		}

		navigation.navigate('Home');
		Alert.alert('Order Placed with order Id : ', docRef.id);
	};

	const EmptyCart = async () => {
		for (var i = 0; i <= order.length - 1; i++) {
			await deleteDoc(doc(firestoreDb, 'cart', order[i]));
		}

		navigation.navigate('Home');
		Alert.alert('Cart Emptied');
	};

	return (
		<MainArea>
			<CartCard>
				{Res.length == 0 ? (
					<CartEmpty>Cart is empty</CartEmpty>
				) : (
					Res.map((obj, i) => (
						<CartFilled key={i}>
							<CartDetails>{obj.name}</CartDetails>
							<CartDetails>${obj.price}</CartDetails>
						</CartFilled>
					))
				)}
			</CartCard>
			<PriceCont>
				<TotalPriceText>Total Price</TotalPriceText>
				{Res.length == 0 ? <CartEmpty>$00.00</CartEmpty> : <CartDetails>${SumPrices()}</CartDetails>}
			</PriceCont>
			<CartBtnCont>
				<CheckOutBtn onPress={HandleOrderDoc}>
					<CheckOutText>Check Out</CheckOutText>
				</CheckOutBtn>
				<EmptyBtn onPress={EmptyCart}>
					<CheckOutText>Empty Cart</CheckOutText>
				</EmptyBtn>
			</CartBtnCont>
		</MainArea>
	);
};

export default Cart;
