import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';

export default function MarketSepet({ navigation }) {
  const handleComplete = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'MainTabs',
            state: {
              routes: [
                {
                  name: 'Home',
                },
              ],
            },
          },
        ],
      })
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Market Sepeti</Text>
      <Text style={styles.subtitle}>Siparişinizi kontrol edin</Text>
      
      <View style={styles.sepetContainer}>
        <Text style={styles.sepetItem}>Süt x2</Text>
        <Text style={styles.sepetItem}>Ekmek x1</Text>
        <Text style={styles.sepetItem}>Yumurta x1</Text>
        <Text style={styles.total}>Toplam: ₺110</Text>
      </View>
      
      <TouchableOpacity
        style={styles.button}
        onPress={handleComplete}
      >
        <Text style={styles.buttonText}>Siparişi Tamamla</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#666',
  },
  sepetContainer: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 8,
    marginBottom: 30,
  },
  sepetItem: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#03a9f4',
  },
  button: {
    backgroundColor: '#03a9f4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

