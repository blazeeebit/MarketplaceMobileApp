import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login';
import Home from './screens/home';
import AddProduct from './screens/addProduct';
import Settings from './screens/settings';
import BottomNav from './components/bottomNav';
import Cart from './screens/cart';
import Register from './screens/register';
import { LogBox } from 'react-native';
import _ from 'lodash';

LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = message => {
if (message.indexOf('Setting a timer') <= -1) {
   _console.warn(message);
   }
};

const Stack = createNativeStackNavigator();

export default function App() {

	return (
		<>
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
				<Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
				<Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
				<Stack.Screen options={{ headerShown: false }} name="Add_Product" component={AddProduct} />
				<Stack.Screen options={{ headerShown: false }} name="Settings" component={Settings} />
				<Stack.Screen options={{ headerShown: false }} name="Cart" component={Cart} />
			</Stack.Navigator>
			<BottomNav/>
		</NavigationContainer>
		</>
	);
}
