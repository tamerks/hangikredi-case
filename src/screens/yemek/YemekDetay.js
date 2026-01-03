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
import { addItem } from "../../redux/slices/yemekCartSlice";
import Toast from "react-native-toast-message";
import { Theme, Typography, Spacing, Radius } from "../../constants/Theme";

export default function YemekDetay({ route, navigation }) {
  const { item } = route.params;
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);

  const handleIncrease = () => setCount((prev) => prev + 1);
  const handleDecrease = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    // Add item 'count' times
    for (let i = 0; i < count; i++) {
      dispatch(addItem(item));
    }

    Toast.show({
      type: "success",
      text1: "Sepete Eklendi",
      text2: `${count} adet ${item.name} sepete eklendi`,
    });

    // Optional: Reset count or navigate back
    // navigation.goBack();
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
              resizeMode="cover"
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
            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>★ {item.rating || "Yeni"}</Text>
            </View>
          </View>

          <Text style={styles.price}>₺{item.price}</Text>

          {/* Details */}
          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Açıklama</Text>
            <Text style={styles.description}>
              {item.description ||
                "Lezzetli ve taze, özel şef tarifimizle hazırlanmıştır. Afiyet olsun!"}
            </Text>
          </View>

          {item.ingredients && (
            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>İçindekiler</Text>
              <View style={styles.tagsContainer}>
                {item.ingredients.map((ing, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{ing}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={styles.infoRow}>
            {item.calories && (
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Kalori</Text>
                <Text style={styles.infoValue}>{item.calories} kcal</Text>
              </View>
            )}
            {item.preparationTime && (
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Süre</Text>
                <Text style={styles.infoValue}>{item.preparationTime}</Text>
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
    backgroundColor: Theme.muted,
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
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    marginTop: -20, // Overlap effect
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.xs,
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
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  tag: {
    backgroundColor: Theme.secondary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
  },
  tagText: {
    fontSize: Typography.size.xs,
    color: Theme.foreground,
    fontFamily: Typography.family.medium,
  },
  infoRow: {
    flexDirection: "row",
    gap: Spacing.xl,
    marginTop: Spacing.md,
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Theme.border,
  },
  infoItem: {
    alignItems: "flex-start",
  },
  infoLabel: {
    fontSize: Typography.size.sm,
    color: Theme.mutedForeground,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: Typography.size.md,
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
  priceContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: Typography.size.xs,
    color: Theme.mutedForeground,
  },
  totalPrice: {
    fontSize: Typography.size.xl,
    fontFamily: Typography.family.bold,
    color: Theme.foreground,
  },
  addButton: {
    backgroundColor: Theme.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    flex: 1,
    alignItems: "center",
    height: 52, // Match qButton height + padding
    justifyContent: "center",
  },
  addButtonText: {
    color: Theme.primaryForeground,
    fontSize: Typography.size.md,
    fontFamily: Typography.family.semiBold,
  },
});
