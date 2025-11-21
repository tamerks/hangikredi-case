import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function YemekAnaSayfa({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Yemek Siparişi</Text>
      <Text style={styles.subtitle}>Lezzetli yemeklerimizi keşfedin</Text>
      
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('YemekSepet')}
        >
          <Text style={styles.menuItemText}>Pizza</Text>
          <Text style={styles.menuItemPrice}>₺150</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('YemekSepet')}
        >
          <Text style={styles.menuItemText}>Burger</Text>
          <Text style={styles.menuItemPrice}>₺120</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('YemekSepet')}
        >
          <Text style={styles.menuItemText}>Döner</Text>
          <Text style={styles.menuItemPrice}>₺100</Text>
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
  menuContainer: {
    gap: 15,
  },
  menuItem: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  menuItemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
  },
});

