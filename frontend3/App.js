import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons';

const { width: WIDTH } = Dimensions.get('window');

export default function App() {
	[username, setUsername] = useState('');
	[password, setPassword] = useState('');

	return (
		<View style={styles.container}>
			<View style={styles.logoContainer}>
				<Text>Where logo will go!</Text>
				<Text style={styles.logoText}>BUMP</Text>
			</View>

			<View style={styles.inputContainer}>
				<Icon
					name={'ios-person-outline'}
					size={28}
					color={'black'}
					style={inputIcon}
				/>
				<TextInput
					style={styles.input}
					placeholder={'Username'}
					placeholderTextColor={'black'}
					value={username}
					onChangeText={text => setUsername(text)}
					// underlineColorAndroid=
				/>
			</View>

			<View style={styles.inputContainer}>
				<Icon
					name={'ios-lock-outline'}
					size={28}
					color={'black'}
					style={inputIcon}
				/>
				<TextInput
					style={styles.input}
					placeholder={'Password'}
					secureTextEntry={true}
					placeholderTextColor={'black'}
					value={password}
					onChangeText={text => setPassword(text)}
					// underlineColorAndroid=
				/>
			</View>

			<TouchableOpacity style={styles.btnLogin}>
				<Text style={styles.text}>Login</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	logoContainer: {
		alignItems: 'center',
		marginBottom: 50
	},
	logo: {
		width: 120,
		height: 120
	},
	logoText: {
		color: 'black',
		fontSize: 20,
		fontWeight: '500',
		marginTop: 10,
		opacity: 0.5
	},
	inputContainer: {
		marginTop: 10
	},
	input: {
		width: WIDTH - 55,
		height: 45,
		borderRadius: 25,
		fontSize: 16,
		paddingLeft: 45,
		backgroundColor: 'white',
		color: 'black',
		marginHorizontal: 25
	},
	inputIcon: {
		position: 'absolute',
		top: 8,
		left: 37
	},
	btnLogin: {
		width: WIDTH - 55,
		height: 45,
		borderRadius: 25,
		backgroundColor: '#3EDD81',
		justifyContent: 'center',
		marginTop: 20
	},
	text: {
		color: 'rgba(255, 255, 255, 0.8)',
		fontSize: 16,
		textAlign: 'center'
	}
});
