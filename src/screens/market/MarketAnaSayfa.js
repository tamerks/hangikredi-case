import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, selectMarketCartItems, selectMarketCartUniqueItemCount } from '../../redux/slices/marketCartSlice';
import Toast from 'react-native-toast-message';

const products = [
  { id: '1', name: 'Süt', price: 25 },
  { id: '2', name: 'Ekmek', price: 15 },
  { id: '3', name: 'Yumurta', price: 45 },
];

export default function MarketAnaSayfa({ navigation }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectMarketCartItems);
  const cartUniqueItemCount = useSelector(selectMarketCartUniqueItemCount);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('MarketSepet')}
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
      // Ürün sepetten tamamen çıkarılacak
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
      <Text style={styles.title}>Market Alışverişi</Text>
      <Text style={styles.subtitle}>Taze ürünlerimizi keşfedin</Text>
      
      <View style={styles.productContainer}>
        {products.map((item) => {
          const quantity = getItemQuantity(item.id);
          return (
            <View key={item.id} style={styles.productItem}>
              <View style={styles.productItemInfo}>
                <Text style={styles.productItemText}>{item.name}</Text>
                <Text style={styles.productItemPrice}>₺{item.price}</Text>
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
  productContainer: {
    gap: 15,
  },
  productItem: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
  },
  productItemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#03a9f4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
    borderColor: '#03a9f4',
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
    backgroundColor: '#03a9f4',
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

