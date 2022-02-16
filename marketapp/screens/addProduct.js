import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native';
import BottomNav from '../components/bottomNav';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc } from 'firebase/firestore';
import { firestoreDb, storage, storageRef, auth } from '../firebase';
import { uploadBytes, listAll } from 'firebase/storage';

const MainArea = styled.SafeAreaView`
	flex: 1;
	${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
	background-color: #d77fa1;
	justify-content: center;
	align-items: center;
`;

const InputCont = styled.View`width: 80%;`;

const Input = styled.TextInput`
	width: 100%;
	background-color: white;
	margin-bottom: 15px;
	padding: 10px 15px;
	border-radius: 15px;
`;

const Heading = styled.Text`
	font-size: 20px;
	color: white;
	margin-bottom: 30px;
	font-weight: bold;
`;

const UploadBtn = styled.TouchableOpacity`
	background-color: purple;
	padding: 10px 15px;
	align-self: center;
	border-radius: 10px;
	margin-bottom: 15px;
`;

const BtnText = styled.Text`
	color: white;
	font-size: 12px;
	font-weight: bold;
`;

const AddProduct = () => {
	const navigation = useNavigation();

	const user = auth.currentUser?.email.split('@')[0];

	const [ name, setName ] = useState('');
	const [ desc, setDesc ] = useState('');
	const [ price, setPrice ] = useState('');
	const [ quantity, setQuantity ] = useState('');
	const [ Image, setImage ] = useState('');

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [ 4, 3 ],
			quality: 1
		});

		console.log(result);

		if (!result.cancelled) {
			setImage(result.uri);
		}
	};

	const HandleNewDoc = async () => {
		 await addDoc(collection(firestoreDb, 'products'), {
			name: name,
			description: desc,
			price: price,
			quantity: quantity,
			seller: user
		});

		navigation.navigate('Home');
		Alert.alert('Product Posted');
	};

	return (
		<MainArea>
			<Heading>Enter Product Details</Heading>
			<InputCont>
				<Input placeholder="Name" onChangeText={(text) => setName(text)} />
				<Input
					placeholder="Description"
					multiline={true}
					numberOfLines={10}
					onChangeText={(text) => setDesc(text)}
				/>
				<Input placeholder="Price" onChangeText={(text) => setPrice(text)} />
				<Input placeholder="Quantity" onChangeText={(text) => setQuantity(text)} />
				<UploadBtn onPress={pickImage}>
					<BtnText>Add Image</BtnText>
				</UploadBtn>
				<UploadBtn onPress={HandleNewDoc}>
					<BtnText>Submit Data</BtnText>
				</UploadBtn>
			</InputCont>
		</MainArea>
	);
};

export default AddProduct;
