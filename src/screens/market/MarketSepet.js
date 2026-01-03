import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  removeItem,
  removeItemCompletely,
  clearCart,
  selectMarketCartItems,
  selectMarketCartTotal,
} from "../../redux/slices/marketCartSlice";
import Toast from "react-native-toast-message";
import { Theme, Typography, Spacing, Radius } from "../../constants/Theme";

export default function MarketSepet({ navigation }) {
  const dispatch = useDispatch();
  const items = useSelector(selectMarketCartItems);
  const total = useSelector(selectMarketCartTotal);

  const handleComplete = () => {
    if (items.length === 0) {
      Toast.show({
        type: "info",
        text1: "Sepet Boş",
        text2: "Sepetinizde ürün bulunmamaktadır",
      });
      return;
    }

    navigation.navigate("OdemeEkrani", {
      totalAmount: total.toFixed(2),
      type: "market",
    });
  };

  const handleIncrease = (item) => {
    dispatch(addItem({ id: item.id, name: item.name, price: item.price }));
  };

  const handleDecrease = (itemId) => {
    const item = items.find((i) => i.id === itemId);
    if (item && item.quantity === 1) {
      dispatch(removeItem(itemId));
    } else {
      dispatch(removeItem(itemId));
    }
  };

  const handleRemove = (itemId) => {
    dispatch(removeItemCompletely(itemId));
    Toast.show({
      type: "success",
      text1: "Ürün Silindi",
      text2: "Ürün sepetten kaldırıldı",
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Market Sepeti</Text>
        <Text style={styles.subtitle}>
          {items.length > 0
            ? `${items.length} farklı ürün`
            : "Henüz ürün eklenmedi"}
        </Text>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛍️</Text>
          <Text style={styles.emptyText}>Sepetiniz boş</Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.browseButtonText}>Alışverişe Başla</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {items.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>₺{item.price}</Text>
                </View>

                <View style={styles.actionsContainer}>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleDecrease(item.id)}
                    >
                      <Text style={styles.quantityButtonText}>−</Text>
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>{item.quantity}</Text>

                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleIncrease(item)}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemove(item.id)}
                  >
                    <Text style={styles.removeButtonText}>Sil</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Toplam Tutar</Text>
              <Text style={styles.totalAmount}>₺{total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleComplete}
              activeOpacity={0.9}
            >
              <Text style={styles.checkoutButtonText}>Siparişi Onayla</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.background,
  },
  header: {
    padding: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Theme.border,
  },
  title: {
    fontSize: Typography.size.xxl,
    fontFamily: Typography.family.bold,
    color: Theme.foreground,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.size.sm,
    fontFamily: Typography.family.regular,
    color: Theme.mutedForeground,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Theme.card,
    borderWidth: 1,
    borderColor: Theme.border,
    borderRadius: Radius.lg,
  },
  itemInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  itemName: {
    fontSize: Typography.size.md,
    fontFamily: Typography.family.semiBold,
    color: Theme.foreground,
    marginBottom: Spacing.xs,
  },
  itemPrice: {
    fontSize: Typography.size.sm,
    fontFamily: Typography.family.medium,
    color: Theme.mutedForeground,
  },
  actionsContainer: {
    alignItems: "flex-end",
    gap: Spacing.sm,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.secondary,
    borderRadius: Radius.md,
    padding: 2,
  },
  quantityButton: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.sm,
  },
  quantityButtonText: {
    fontSize: Typography.size.md,
    fontFamily: Typography.family.medium,
    color: Theme.foreground,
  },
  quantityText: {
    fontSize: Typography.size.sm,
    fontFamily: Typography.family.semiBold,
    color: Theme.foreground,
    minWidth: 24,
    textAlign: "center",
  },
  removeButton: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  removeButtonText: {
    fontSize: Typography.size.xs,
    fontFamily: Typography.family.medium,
    color: Theme.destructive,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xxl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: Spacing.lg,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: Typography.size.lg,
    fontFamily: Typography.family.medium,
    color: Theme.mutedForeground,
    marginBottom: Spacing.xl,
  },
  browseButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    backgroundColor: Theme.secondary,
    borderRadius: Radius.md,
  },
  browseButtonText: {
    fontSize: Typography.size.md,
    fontFamily: Typography.family.semiBold,
    color: Theme.foreground,
  },
  footer: {
    padding: Spacing.xl,
    backgroundColor: Theme.background,
    borderTopWidth: 1,
    borderTopColor: Theme.border,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  totalLabel: {
    fontSize: Typography.size.md,
    fontFamily: Typography.family.medium,
    color: Theme.mutedForeground,
  },
  totalAmount: {
    fontSize: Typography.size.xxl,
    fontFamily: Typography.family.bold,
    color: Theme.foreground,
  },
  checkoutButton: {
    backgroundColor: Theme.primary,
    paddingVertical: Spacing.lg,
    borderRadius: Radius.md,
    alignItems: "center",
  },
  checkoutButtonText: {
    fontSize: Typography.size.md,
    fontFamily: Typography.family.semiBold,
    color: Theme.primaryForeground,
  },
});
