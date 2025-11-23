import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { logout, getCurrentUser } from '../services/authService';
import { clearCart as clearYemekCart } from '../redux/slices/yemekCartSlice';
import { clearCart as clearMarketCart } from '../redux/slices/marketCartSlice';

export default function ProfilScreen({ navigation }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = getCurrentUser();

  const handleLogout = async () => {
    setLoading(true);
    
    dispatch(clearYemekCart());
    dispatch(clearMarketCart());
    
    const result = await logout();
    
    setLoading(false);
    
    if (result.success) {
      Toast.show({
        type: 'success',
        text1: 'Başarılı',
        text2: 'Çıkış yapıldı',
        visibilityTime: 2000,
      });
      navigation.replace('Login');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: result.error || 'Çıkış yapılamadı',
        visibilityTime: 2000,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <Text style={styles.subtitle}>Kullanıcı Bilgileri</Text>
      
      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      )}
      
      <TouchableOpacity
        style={[styles.logoutButton, loading && styles.buttonDisabled]}
        onPress={handleLogout}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
        )}
      </TouchableOpacity>
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
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  userInfo: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  userEmail: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

