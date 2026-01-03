import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getCurrentUser } from "../../services/authService";
import {
  Theme,
  Typography,
  Spacing,
  Radius,
  Shadows,
} from "../../constants/Theme";

import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const user = getCurrentUser();
  const userName = user?.email?.split("@")[0] || "Misafir";

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + Spacing.xl },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Merhaba,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      {/* Services */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ne yapmak istersiniz?</Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Yemek", { screen: "YemekAnaSayfa" })
          }
          activeOpacity={0.7}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Yemek Siparişi</Text>
            <Text style={styles.cardSubtitle}>
              Restoran menülerini keşfedin
            </Text>
          </View>
          <Text style={styles.cardArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Market", { screen: "MarketAnaSayfa" })
          }
          activeOpacity={0.7}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Market Alışverişi</Text>
            <Text style={styles.cardSubtitle}>
              Günlük ihtiyaçlarınızı sipariş edin
            </Text>
          </View>
          <Text style={styles.cardArrow}>→</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.background,
  },
  content: {
    padding: Spacing.xl,
  },
  header: {
    marginBottom: Spacing.xxl,
    flexDirection: "row",
    alignItems: "center",
  },
  greeting: {
    fontSize: Typography.size.xxl,
    fontFamily: Typography.family.regular,
    color: Theme.mutedForeground,
    marginRight: Spacing.xs,
  },
  userName: {
    fontSize: Typography.size.xxl,
    fontFamily: Typography.family.bold,
    color: Theme.foreground,
  },
  section: {
    gap: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.size.lg,
    fontFamily: Typography.family.semiBold,
    color: Theme.foreground,
    marginBottom: Spacing.sm,
  },
  card: {
    backgroundColor: Theme.card,
    borderWidth: 1,
    borderColor: Theme.border,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...Shadows.sm,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: Typography.size.lg,
    fontFamily: Typography.family.semiBold,
    color: Theme.foreground,
    marginBottom: Spacing.xs,
  },
  cardSubtitle: {
    fontSize: Typography.size.sm,
    fontFamily: Typography.family.regular,
    color: Theme.mutedForeground,
  },
  cardArrow: {
    fontSize: Typography.size.xl,
    color: Theme.mutedForeground,
  },
});
