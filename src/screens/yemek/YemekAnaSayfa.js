import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  removeItem,
  selectYemekCartItems,
  selectYemekCartUniqueItemCount,
} from "../../redux/slices/yemekCartSlice";
import Toast from "react-native-toast-message";
import apiService from "../../services/apiService";
import {
  Theme,
  Typography,
  Spacing,
  Radius,
  Shadows,
} from "../../constants/Theme";
import { Skeleton } from "../../components/ui/Skeleton";

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
        <TouchableOpacity
          onPress={() => navigation.navigate("YemekSepet")}
          style={styles.cartButton}
        >
          <Text style={styles.cartIcon}>🛒</Text>
          {cartUniqueItemCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartUniqueItemCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, cartUniqueItemCount]);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.get("/hangikredi.json");

      if (response.success && response.data) {
        setMenuItems(response.data.yemek || []);
      } else {
        setError(response.error || "Veriler yüklenemedi");
        Toast.show({
          type: "error",
          text1: "Hata",
          text2: response.error || "Veriler yüklenemedi",
        });
      }
    } catch (err) {
      setError("Bir hata oluştu");
      Toast.show({
        type: "error",
        text1: "Hata",
        text2: "Veriler yüklenirken bir hata oluştu",
      });
    } finally {
      setLoading(false);
    }
  };

  const getItemQuantity = (itemId) => {
    const item = cartItems.find((i) => i.id === itemId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (item) => {
    dispatch(addItem(item));
    Toast.show({
      type: "success",
      text1: "Sepete Eklendi",
      text2: `${item.name} sepete eklendi`,
    });
  };

  const handleIncrease = (item) => {
    dispatch(addItem(item));
  };

  const handleDecrease = (itemId) => {
    const item = cartItems.find((i) => i.id === itemId);
    if (item && item.quantity === 1) {
      dispatch(removeItem(itemId));
      Toast.show({
        type: "info",
        text1: "Sepetten Çıkarıldı",
        text2: `${item.name} sepetten çıkarıldı`,
      });
    } else {
      dispatch(removeItem(itemId));
    }
  };

  const renderItem = ({ item }) => {
    const quantity = getItemQuantity(item.id);

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate("YemekDetay", { item })}
      >
        <View style={styles.itemCard}>
          {/* Image Placeholder or Actual Image if available in list (optional, but good for list) */}
          {item.image && (
            <Image source={{ uri: item.image }} style={styles.listImage} />
          )}

          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDescription} numberOfLines={2}>
              {item.description}
            </Text>
            <Text style={styles.itemPrice}>₺{item.price}</Text>
          </View>

          <View style={styles.quantityContainer}>
            {quantity === 0 ? (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddToCart(item)}
              >
                <Text style={styles.addButtonText}>Ekle</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => handleDecrease(item.id)}
                >
                  <Text style={styles.controlButtonText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                  style={[styles.controlButton, styles.controlButtonPrimary]}
                  onPress={() => handleIncrease(item)}
                >
                  <Text style={styles.controlButtonTextPrimary}>+</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.listContent}>
        {[1, 2, 3, 4].map((i) => (
          <View key={i} style={styles.itemCard}>
            <Skeleton
              width={80}
              height={80}
              borderRadius={Radius.md}
              style={{ marginRight: Spacing.md }}
            />
            <View style={{ flex: 1 }}>
              <Skeleton
                width="70%"
                height={20}
                style={{ marginBottom: Spacing.sm }}
              />
              <Skeleton width="40%" height={16} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: Spacing.md,
                }}
              >
                <Skeleton width="30%" height={24} />
                <Skeleton width={80} height={36} borderRadius={Radius.lg} />
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
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
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.background,
    padding: Spacing.xl,
  },
  listContent: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  loadingText: {
    marginTop: Spacing.md,
    fontSize: Typography.size.md,
    color: Theme.mutedForeground,
  },
  errorText: {
    fontSize: Typography.size.md,
    color: Theme.destructive,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  retryButton: {
    backgroundColor: Theme.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
  },
  retryButtonText: {
    color: Theme.primaryForeground,
    fontFamily: Typography.family.semiBold,
    fontSize: Typography.size.md,
  },
  cartButton: {
    marginRight: Spacing.md,
    position: "relative",
  },
  cartIcon: {
    fontSize: 24,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: Theme.destructive,
    borderRadius: Radius.full,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontFamily: Typography.family.bold,
  },
  itemCard: {
    backgroundColor: Theme.card,
    borderWidth: 1,
    borderColor: Theme.border,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.md, // Add explicit margin bottom for TouchableOpacity wrapper
  },
  listImage: {
    width: 60,
    height: 60,
    borderRadius: Radius.md,
    backgroundColor: Theme.muted,
    marginRight: Spacing.md,
  },
  itemInfo: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  itemName: {
    fontSize: Typography.size.md,
    fontFamily: Typography.family.semiBold,
    color: Theme.foreground,
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: Typography.size.xs,
    fontFamily: Typography.family.regular,
    color: Theme.mutedForeground,
    marginBottom: Spacing.xs,
  },
  itemPrice: {
    fontSize: Typography.size.md,
    fontFamily: Typography.family.bold,
    color: Theme.foreground,
  },
  quantityContainer: {
    minWidth: 100,
    alignItems: "flex-end",
  },
  addButton: {
    backgroundColor: Theme.secondary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Theme.border,
  },
  addButtonText: {
    color: Theme.secondaryForeground,
    fontFamily: Typography.family.medium,
    fontSize: Typography.size.sm,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  controlButton: {
    width: 32,
    height: 32,
    borderRadius: Radius.md,
    backgroundColor: Theme.secondary,
    borderWidth: 1,
    borderColor: Theme.border,
    justifyContent: "center",
    alignItems: "center",
  },
  controlButtonPrimary: {
    backgroundColor: Theme.primary,
    borderColor: Theme.primary,
  },
  controlButtonText: {
    fontSize: Typography.size.lg,
    color: Theme.secondaryForeground,
    fontFamily: Typography.family.bold,
  },
  controlButtonTextPrimary: {
    fontSize: Typography.size.lg,
    color: Theme.primaryForeground,
    fontFamily: Typography.family.bold,
  },
  quantityText: {
    fontSize: Typography.size.md,
    fontFamily: Typography.family.semiBold,
    color: Theme.foreground,
    minWidth: 24,
    textAlign: "center",
  },
});
