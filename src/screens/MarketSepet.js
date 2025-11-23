import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { 
  addItem,
  removeItem, 
  removeItemCompletely, 
  clearCart,
  selectMarketCartItems,
  selectMarketCartTotal 
} from '../redux/slices/marketCartSlice';
import Toast from 'react-native-toast-message';

export default function MarketSepet({ navigation }) {
  const dispatch = useDispatch();
  const items = useSelector(selectMarketCartItems);
  const total = useSelector(selectMarketCartTotal);

  const handleComplete = () => {
    if (items.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Sepet Boş',
        text2: 'Sepetinizde ürün bulunmamaktadır',
        visibilityTime: 2000,
      });
      return;
    }

    dispatch(clearCart());
    Toast.show({
      type: 'success',
      text1: 'Sipariş Tamamlandı',
      text2: 'Siparişiniz başarıyla tamamlandı',
      visibilityTime: 2000,
    });
    
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  const handleIncrease = (itemId) => {
    const item = items.find(i => i.id === itemId);
    if (item) {
      dispatch(addItem({ id: item.id, name: item.name, price: item.price }));
    }
  };

  const handleDecrease = (itemId) => {
    const item = items.find(i => i.id === itemId);
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

  const handleRemove = (itemId) => {
    dispatch(removeItemCompletely(itemId));
    Toast.show({
      type: 'success',
      text1: 'Ürün Silindi',
      text2: 'Ürün sepetten kaldırıldı',
      visibilityTime: 2000,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Market Sepeti</Text>
      <Text style={styles.subtitle}>Siparişinizi kontrol edin</Text>
      
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Sepetiniz boş</Text>
        </View>
      ) : (
        <>
          <ScrollView style={styles.scrollView}>
            <View style={styles.sepetContainer}>
              {items.map((item) => (
                <View key={item.id} style={styles.itemRow}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>₺{item.price}</Text>
                  </View>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleDecrease(item.id)}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleIncrease(item.id)}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemove(item.id)}
                    >
                      <Text style={styles.removeButtonText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
          
          <View style={styles.totalContainer}>
            <Text style={styles.total}>Toplam: ₺{total.toFixed(2)}</Text>
          </View>
          
          <TouchableOpacity
            style={styles.button}
            onPress={handleComplete}
          >
            <Text style={styles.buttonText}>Siparişi Tamamla</Text>
          </TouchableOpacity>
        </>
      )}
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
  scrollView: {
    flex: 1,
  },
  sepetContainer: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  quantityButton: {
    backgroundColor: '#03a9f4',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    minWidth: 30,
    textAlign: 'center',
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#f44336',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
  totalContainer: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#03a9f4',
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#03a9f4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

