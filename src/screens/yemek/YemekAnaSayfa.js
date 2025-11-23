import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, selectYemekCartItems, selectYemekCartUniqueItemCount } from '../../redux/slices/yemekCartSlice';
import Toast from 'react-native-toast-message';
import apiService from '../../services/apiService';
import { DefaultColors } from '../../constants/DefaultColors';

export default function YemekAnaSayfa({ navigation }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectYemekCartItems);
  const cartUniqueItemCount = useSelector(selectYemekCartUniqueItemCount);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('YemekSepet')}
            style={styles.cartButton}
          >
            <Text style={styles.cartIcon}>🛒</Text>
            {cartUniqueItemCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartUniqueItemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, cartUniqueItemCount]);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.get('/hangikredi.json');
      
      if (response.success && response.data) {
        setMenuItems(response.data.yemek || []);
      } else {
        setError(response.error || 'Veriler yüklenemedi');
        Toast.show({
          type: 'error',
          text1: 'Hata',
          text2: response.error || 'Veriler yüklenemedi',
          visibilityTime: 3000,
        });
      }
    } catch (err) {
      setError('Bir hata oluştu');
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: 'Veriler yüklenirken bir hata oluştu',
        visibilityTime: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const getItemQuantity = (itemId) => {
    const item = cartItems.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (item) => {
    dispatch(addItem(item));
    Toast.show({
      type: 'success',
      text1: 'Sepete Eklendi',
      text2: `${item.name} sepete eklendi`,
      visibilityTime: 2000,
    });
  };

  const handleIncrease = (item) => {
    dispatch(addItem(item));
  };

  const handleDecrease = (itemId) => {
    const item = cartItems.find(i => i.id === itemId);
    if (item && item.quantity === 1) {
      dispatch(removeItem(itemId));
      Toast.show({
        type: 'info',
        text1: 'Sepetten Çıkarıldı',
        text2: `${item.name} sepetten çıkarıldı`,
        visibilityTime: 2000,
      });
    } else {
      dispatch(removeItem(itemId));
    }
  };

  const renderMenuItem = ({ item }) => {
    const quantity = getItemQuantity(item.id);
    return (
      <View style={styles.menuItem}>
        <View style={styles.menuItemInfo}>
          <Text style={styles.menuItemText}>{item.name}</Text>
          <Text style={styles.menuItemPrice}>₺{item.price}</Text>
        </View>
        {quantity === 0 ? (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddToCart(item)}
          >
            <Text style={styles.addButtonText}>Sepete Ekle</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleDecrease(item.id)}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleIncrease(item)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderHeader = () => (
    <View>
      <Text style={styles.title}>Yemek Siparişi</Text>
      <Text style={styles.subtitle}>Lezzetli yemeklerimizi keşfedin</Text>
    </View>
  );

  const renderEmpty = () => (
    <Text style={styles.emptyText}>Henüz yemek bulunmamaktadır.</Text>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={DefaultColors.primary} />
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchMenuItems}>
          <Text style={styles.retryButtonText}>Tekrar Dene</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
    color: DefaultColors.text,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: DefaultColors.textSecondary,
  },
  listContent: {
    paddingBottom: 20,
  },
  menuItem: {
    backgroundColor: DefaultColors.background,
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
  },
  menuItemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: DefaultColors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: '600',
    color: DefaultColors.text,
  },
  menuItemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: DefaultColors.primary,
  },
  headerRightContainer: {
    marginRight: 10,
    paddingRight: 5,
    paddingTop: 5,
    overflow: 'visible',
  },
  cartButton: {
    padding: 8,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 40,
    minHeight: 40,
  },
  cartIcon: {
    fontSize: 24,
    color: '#fff',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: DefaultColors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: DefaultColors.primary,
    zIndex: 1,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  quantityButton: {
    backgroundColor: DefaultColors.primary,
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    minWidth: 30,
    textAlign: 'center',
    color: DefaultColors.text,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: DefaultColors.textSecondary,
  },
  errorText: {
    fontSize: 16,
    color: DefaultColors.error,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: DefaultColors.primary,
    padding: 12,
    borderRadius: 8,
    paddingHorizontal: 24,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    color: DefaultColors.textSecondary,
    textAlign: 'center',
    marginTop: 20,
  },
});

