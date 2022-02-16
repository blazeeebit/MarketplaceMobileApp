import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import styled from 'styled-components';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import NavCards from '../components/navCards';
import BottomNav from '../components/bottomNav';
import ItemCard from '../components/itemCard';
import { firestoreDb, auth } from '../firebase';
import { collection, getDocs, doc, query, where  } from 'firebase/firestore';
import Singleitem from '../components/singleItem';

const MainArea = styled.SafeAreaView`
	flex: 1;
	justify-content: flex-end;
	${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
	background-color: #D77FA1;
	position: relative;
`;

const Nav = styled.View`height: 10%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 0 20px;
	background-color: white;
`;

const UserName = styled.Text`
	font-weight: bold;
	color: #3F3F3F;
	font-size: 20px;
`

const CartBtn = styled.TouchableOpacity`
	width: 50px;
	height: 50px;
	background-color: orange;
	position: absolute;
	top: 150;
	z-index: 1;
	right: 15;
	border-radius: 50;
	display: flex;
	justify-content: center;
	align-items: center;
`

const InputCont = styled.View`
	width: 100%;
	display: flex;
	flex-direction: row;
	padding: 0 30px 0 10px;
	align-items: center;
`

const CartBtn2 = styled.TouchableOpacity`
	background-color: #505050;
	height: 48px;
	width: 60px;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
`

const CartText = styled.Text`
	font-weight: bold;
	color: white;
`

const Searchbar = styled.TextInput`
	background-color: white;
	width: 80%;
	padding: 10px 20px;
	border-radius: 10px;
	margin: 10px 15px 10px 15px;
`

const Home = () => {

	const navigation = useNavigation();

	const state = useNavigationState((state) => state);

	const Home = state.routes[state.routes.length - 1].name == 'Home';

	const [user, setUser] = useState('');
	const [search, setSearch] = useState('');
	const [ResSingle, setResSingle] = useState('');
	const [Res, setRes] = useState('');

	useEffect(() => {
		const user = auth.currentUser?.email.split('@')[0];
		setUser(user);
		setSearch('');
		ReadData();
	}, [Home == true]);

	const arr = [];

	const ReadData = async () => {
		const querySnapshot = await getDocs(collection(firestoreDb, 'products'));
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			arr.push(doc.data());
		});
        setRes(arr);
	};

	const ReadSingleData = async () => {

		const prodRef = collection(firestoreDb, "products");

		const q = query(prodRef, where("name", "==", search));

		const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			arr.push(doc.data());
			});
        setResSingle(arr);
	};


	const OpenCart = () => {
		navigation.push('Cart');
	}

	return (
		<MainArea>
			<Nav>
				<UserName>
					Welcome {user}
				</UserName>
			</Nav>
			<InputCont>
			<Searchbar
					placeholder="Search product"
					value={search}
					onChangeText={(text) => setSearch(text)}
				/>
				<CartBtn2 onPress={ReadSingleData}><CartText>Search</CartText></CartBtn2>
			</InputCont>
			<CartBtn onPress={OpenCart}><CartText>Cart</CartText></CartBtn>	
			{!search ? <FlatList
					data={[ { name: 1 }]}
					renderItem={() => <ItemCard itemData={Res}/>}
					keyExtractor={(item) => item.name}
					contentContainerStyle={{ padding: 16 }}
				/> : <FlatList
				data={[ { name: 1 }]}
				renderItem={() => <Singleitem itemData={ResSingle}/>}
				keyExtractor={(item) => item.name}
				contentContainerStyle={{ padding: 16 }}
			/>}
			
		</MainArea>
	);
};

export default Home;
