import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Theme,
  Typography,
  Radius,
  Spacing,
  Shadows,
} from "../../constants/Theme";

/*
  Modern Toast Tasarımı
  Minimalist, ikonlu ve temanın renklerine uygun.
*/

const ToastMessage = ({ text1, text2, type }) => {
  let backgroundColor = Theme.card;
  let borderColor = Theme.border;
  let icon = "ℹ️";
  let titleColor = Theme.foreground;

  switch (type) {
    case "success":
      backgroundColor = "#F0FDF4"; // Yeşile çalan çok açık gri
      borderColor = "#BBF7D0"; // Açık yeşil border
      icon = "✅";
      titleColor = "#15803d"; // Koyu yeşil
      break;
    case "error":
      backgroundColor = "#FEF2F2"; // Kırmızıya çalan çok açık gri
      borderColor = "#FECACA";
      icon = "⚠️";
      titleColor = "#B91C1C";
      break;
    case "info":
    default:
      backgroundColor = Theme.card;
      borderColor = Theme.border;
      icon = "ℹ️";
      titleColor = Theme.foreground;
      break;
  }

  return (
    <View style={[styles.container, { backgroundColor, borderColor }]}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: titleColor }]}>{text1}</Text>
        {text2 ? <Text style={styles.message}>{text2}</Text> : null}
      </View>
    </View>
  );
};

export const toastConfig = {
  success: (props) => <ToastMessage {...props} type="success" />,
  error: (props) => <ToastMessage {...props} type="error" />,
  info: (props) => <ToastMessage {...props} type="info" />,
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    ...Shadows.md,
    marginTop: Spacing.xl, // Top offset
  },
  iconContainer: {
    marginRight: Spacing.md,
  },
  icon: {
    fontSize: 20,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.md,
    marginBottom: 2,
  },
  message: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.sm,
    color: Theme.mutedForeground,
  },
});
