import { useKindeAuth } from '@kinde/expo';
import { Pressable, View, Text } from 'react-native';
import {useState, useEffect} from 'react';
import * as Sentry from '@sentry/react-native';
import * as Linking from 'expo-linking';

export default function Authentication () {
	const kinde = useKindeAuth();
	const [pressed, setPressed] = useState(false);



	const handleSignUp = async () => {
  		const token = await kinde.register();
  		if (token) {
  			console.log('registered', JSON.stringify(token));
  		} else {
			throw new Error('Failed to register', token);
		}
	};

	const handleSignIn = async () => {
		setPressed(true);
		Sentry.captureMessage("Hello Sentry!");
  		const token = await kinde.login();
		  Sentry.captureMessage(`Hello Sentry! ${JSON.stringify(token)}`);
  		if (token) {
			console.log('registered', JSON.stringify(token));

  		} else {
			throw new Error('Failed to sign in', token);
		}
	};

	const handleLogout = async () => {
  		const logoutResult = await kinde.logout();
		  captureMessage(`logoutResult ${JSON.stringify(logoutResult)}`);

	};

	return !kinde.isAuthenticated ? (
		<View>
			{pressed ? <Text>Pressed</Text> : null}
			<Pressable onPress={handleSignIn}><Text>Sign In</Text></Pressable>
			<Pressable onPress={handleSignUp}><Text>Sign Up</Text></Pressable>
		</View>
	) : (
		<Pressable onPress={handleLogout}><Text>Logout</Text></Pressable>
	);	
}