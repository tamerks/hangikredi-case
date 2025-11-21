import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function MarketAnaSayfa({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Market Alışverişi</Text>
      <Text style={styles.subtitle}>Taze ürünlerimizi keşfedin</Text>
      
      <View style={styles.productContainer}>
        <TouchableOpacity
          style={styles.productItem}
          onPress={() => navigation.navigate('MarketSepet')}
        >
          <Text style={styles.productItemText}>Süt</Text>
          <Text style={styles.productItemPrice}>₺25</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.productItem}
          onPress={() => navigation.navigate('MarketSepet')}
        >
          <Text style={styles.productItemText}>Ekmek</Text>
          <Text style={styles.productItemPrice}>₺15</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.productItem}
          onPress={() => navigation.navigate('MarketSepet')}
        >
          <Text style={styles.productItemText}>Yumurta</Text>
          <Text style={styles.productItemPrice}>₺45</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  productContainer: {
    gap: 15,
  },
  productItem: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productItemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  productItemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#03a9f4',
  },
});

