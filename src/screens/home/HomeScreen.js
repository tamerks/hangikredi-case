import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DefaultColors } from '../../constants/DefaultColors';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ana Sayfa</Text>
      <Text style={styles.subtitle}>Hoş geldiniz!</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Yemek', { screen: 'YemekAnaSayfa' })}
        >
          <Text style={styles.buttonText}>Yemek Siparişi</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.marketButton]}
          onPress={() => navigation.navigate('Market', { screen: 'MarketAnaSayfa' })}
        >
          <Text style={styles.buttonText}>Market Alışverişi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: DefaultColors.text,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: DefaultColors.textSecondary,
  },
  buttonContainer: {
    gap: 15,
  },
  button: {
    backgroundColor: DefaultColors.primary,
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
  },
  marketButton: {
    backgroundColor: DefaultColors.secondary,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

