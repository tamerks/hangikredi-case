import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/marketCartSlice";
import Toast from "react-native-toast-message";
import { Theme, Typography, Spacing, Radius } from "../../constants/Theme";

export default function MarketDetay({ route, navigation }) {
  const { item } = route.params;
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);

  const handleIncrease = () => setCount((prev) => prev + 1);
  const handleDecrease = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    for (let i = 0; i < count; i++) {
      dispatch(addItem(item));
    }

    Toast.show({
      type: "success",
      text1: "Sepete Eklendi",
      text2: `${count} adet ${item.name} sepete eklendi`,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Image */}
        <View style={styles.imageContainer}>
          {item.image ? (
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>Görsel Yok</Text>
            </View>
          )}
        </View>

        <View style={styles.contentContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.brand}>{item.brand}</Text>
              <Text style={styles.title}>{item.name}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>★ {item.rating || "4.5"}</Text>
            </View>
          </View>

          <Text style={styles.price}>₺{item.price}</Text>

          {/* Details */}
          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Ürün Bilgileri</Text>
            <Text style={styles.description}>
              {item.description ||
                "Kaliteli ve taze ürün, market güvencesiyle kapınızda."}
            </Text>
          </View>

          <View style={styles.infoBox}>
            {item.weight && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Ağırlık:</Text>
                <Text style={styles.infoValue}>{item.weight}</Text>
              </View>
            )}
            {item.origin && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Menşei:</Text>
                <Text style={styles.infoValue}>{item.origin}</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <View style={styles.quantityControl}>
          <TouchableOpacity onPress={handleDecrease} style={styles.qButton}>
            <Text style={styles.qButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qText}>{count}</Text>
          <TouchableOpacity onPress={handleIncrease} style={styles.qButton}>
            <Text style={styles.qButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>
            Sepete Ekle (₺{item.price * count})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.background,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    height: 300,
    width: "100%",
    backgroundColor: "#fff", // White background for product images usually looks better
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    backgroundColor: Theme.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    color: Theme.mutedForeground,
    fontSize: Typography.size.lg,
  },
  contentContainer: {
    padding: Spacing.xl,
    backgroundColor: Theme.background,
    borderTopWidth: 1,
    borderTopColor: Theme.border,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.xs,
  },
  brand: {
    fontSize: Typography.size.sm,
    color: Theme.mutedForeground,
    marginBottom: 2,
    fontFamily: Typography.family.medium,
  },
  title: {
    fontSize: Typography.size.xl,
    fontFamily: Typography.family.bold,
    color: Theme.foreground,
    flex: 1,
    marginRight: Spacing.md,
  },
  ratingContainer: {
    backgroundColor: Theme.secondary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  ratingText: {
    fontSize: Typography.size.sm,
    fontFamily: Typography.family.semiBold,
    color: Theme.foreground,
  },
  price: {
    fontSize: Typography.size.xxl,
    fontFamily: Typography.family.bold,
    color: Theme.primary,
    marginBottom: Spacing.lg,
  },
  detailSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.size.md,
    fontFamily: Typography.family.semiBold,
    color: Theme.foreground,
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: Typography.size.md,
    fontFamily: Typography.family.regular,
    color: Theme.mutedForeground,
    lineHeight: 24,
  },
  infoBox: {
    backgroundColor: Theme.secondary,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    gap: Spacing.sm,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoLabel: {
    color: Theme.mutedForeground,
    fontFamily: Typography.family.medium,
  },
  infoValue: {
    color: Theme.foreground,
    fontFamily: Typography.family.semiBold,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Theme.background,
    padding: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Theme.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: Spacing.xl + 20, // For iPhone home indicator
    gap: Spacing.md,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.secondary,
    borderRadius: Radius.lg,
    padding: Spacing.xs,
  },
  qButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.background,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Theme.border,
  },
  qButtonText: {
    fontSize: Typography.size.lg,
    fontFamily: Typography.family.medium,
    color: Theme.foreground,
  },
  qText: {
    fontSize: Typography.size.lg,
    fontFamily: Typography.family.bold,
    color: Theme.foreground,
    width: 40,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: Theme.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    flex: 1,
    alignItems: "center",
    height: 52,
    justifyContent: "center",
  },
  addButtonText: {
    color: Theme.primaryForeground,
    fontSize: Typography.size.md,
    fontFamily: Typography.family.semiBold,
  },
});
