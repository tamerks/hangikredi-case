import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, selectYemekCartItems, selectYemekCartUniqueItemCount } from '../../redux/slices/yemekCartSlice';
import Toast from 'react-native-toast-message';

const menuItems = [
  { id: '1', name: 'Pizza', price: 150 },
  { id: '2', name: 'Burger', price: 120 },
  { id: '3', name: 'Döner', price: 100 },
];

export default function YemekAnaSayfa({ navigation }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectYemekCartItems);
  const cartUniqueItemCount = useSelector(selectYemekCartUniqueItemCount);

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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Yemek Siparişi</Text>
      <Text style={styles.subtitle}>Lezzetli yemeklerimizi keşfedin</Text>
      
      <View style={styles.menuContainer}>
        {menuItems.map((item) => {
          const quantity = getItemQuantity(item.id);
          return (
            <View key={item.id} style={styles.menuItem}>
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
        })}
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
    marginBottom: 15,
  },
  menuItemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#6200ee',
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
    color: '#333',
  },
  menuItemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
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
    backgroundColor: '#f44336',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: '#6200ee',
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
    backgroundColor: '#6200ee',
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
    color: '#333',
  },
});

