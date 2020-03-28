import React from 'react';
import { Image, Text, View } from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';



export default function Incident() {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={logoImg} />
				<Text style={styles.headerText}>
					Total de <Text style={styles.headerTextBold}>o casos.</Text>
				</Text>
			</View>
			<Text style={styles.title}>Bem-Vindo</Text>
			<Text style={styles.description}>Escolha um dos casos a baixo e salve o dia!</Text>
		</View>
	);
}