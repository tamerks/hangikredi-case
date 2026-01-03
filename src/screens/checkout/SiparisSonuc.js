import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Theme, Typography, Spacing, Radius } from "../../constants/Theme";

export default function SiparisSonuc({ navigation }) {
  const handleHome = () => {
    navigation.popToTop();
    navigation.navigate("MainTabs", { screen: "Home" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>✅</Text>
      </View>

      <Text style={styles.title}>Siparişiniz Alındı!</Text>
      <Text style={styles.message}>
        Siparişiniz başarıyla oluşturuldu ve hazırlanmaya başlandı.
      </Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Tahmini Teslimat</Text>
        <Text style={styles.infoValue}>25 - 35 Dakika</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleHome}>
        <Text style={styles.buttonText}>Ana Sayfaya Dön</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.background,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: Radius.full,
    backgroundColor: "#F0FDF4",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.xl,
    borderWidth: 2,
    borderColor: "#BBF7D0",
  },
  icon: {
    fontSize: 50,
  },
  title: {
    fontSize: Typography.size.xxl,
    fontFamily: Typography.family.bold,
    color: Theme.foreground,
    marginBottom: Spacing.md,
    textAlign: "center",
  },
  message: {
    fontSize: Typography.size.md,
    fontFamily: Typography.family.regular,
    color: Theme.mutedForeground,
    textAlign: "center",
    marginBottom: Spacing.xxl,
    lineHeight: 24,
  },
  infoCard: {
    backgroundColor: Theme.secondary,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    width: "100%",
    alignItems: "center",
    marginBottom: Spacing.xxl,
  },
  infoTitle: {
    fontSize: Typography.size.sm,
    color: Theme.mutedForeground,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: Typography.size.xl,
    fontFamily: Typography.family.bold,
    color: Theme.foreground,
  },
  button: {
    backgroundColor: Theme.primary,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.lg,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: Theme.primaryForeground,
    fontSize: Typography.size.lg,
    fontFamily: Typography.family.semiBold,
  },
});
