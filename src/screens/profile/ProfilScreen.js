import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { logout, getCurrentUser } from "../../services/authService";
import { clearCart as clearYemekCart } from "../../redux/slices/yemekCartSlice";
import { clearCart as clearMarketCart } from "../../redux/slices/marketCartSlice";
import { Theme, Typography, Spacing, Radius } from "../../constants/Theme";

export default function ProfilScreen({ navigation }) {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const user = getCurrentUser();

  const userName = user?.email?.split("@")[0] || "Kullanıcı";

  const handleLogout = async () => {
    setLoading(true);

    dispatch(clearYemekCart());
    dispatch(clearMarketCart());

    const result = await logout();

    setLoading(false);

    if (result.success) {
      Toast.show({
        type: "success",
        text1: "Başarılı",
        text2: "Çıkış yapıldı",
      });
      navigation.replace("Login");
    } else {
      Toast.show({
        type: "error",
        text1: "Hata",
        text2: result.error || "Çıkış yapılamadı",
      });
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
      </View>

      <View style={styles.content}>
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {userName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>Hesap Ayarları</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Adreslerim")}
          >
            <Text style={styles.menuItemText}>Adreslerim</Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Siparislerim")}
          >
            <Text style={styles.menuItemText}>Siparişlerim</Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("OdemeYontemleri")}
          >
            <Text style={styles.menuItemText}>Ödeme Yöntemleri</Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.logoutButton, loading && styles.buttonDisabled]}
          onPress={handleLogout}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={Theme.destructiveForeground} />
          ) : (
            <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
          )}
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
  header: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Theme.border,
  },
  headerTitle: {
    fontSize: Typography.size.xxl,
    fontFamily: Typography.family.bold,
    color: Theme.foreground,
  },
  content: {
    padding: Spacing.xl,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    backgroundColor: Theme.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Theme.border,
    marginBottom: Spacing.xxl,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: Radius.full,
    backgroundColor: Theme.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.lg,
  },
  avatarText: {
    fontSize: Typography.size.xl,
    fontFamily: Typography.family.bold,
    color: Theme.foreground,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: Typography.size.lg,
    fontFamily: Typography.family.semiBold,
    color: Theme.foreground,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: Typography.size.sm,
    fontFamily: Typography.family.regular,
    color: Theme.mutedForeground,
  },
  menuSection: {
    marginBottom: Spacing.xxl,
  },
  menuTitle: {
    fontSize: Typography.size.sm,
    fontFamily: Typography.family.medium,
    color: Theme.mutedForeground,
    marginBottom: Spacing.sm,
    marginLeft: Spacing.xs,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.lg,
    backgroundColor: Theme.card,
    borderBottomWidth: 1,
    borderBottomColor: Theme.border,
  },
  menuItemText: {
    fontSize: Typography.size.md,
    fontFamily: Typography.family.regular,
    color: Theme.foreground,
  },
  menuItemArrow: {
    fontSize: Typography.size.lg,
    color: Theme.mutedForeground,
  },
  logoutButton: {
    backgroundColor: Theme.destructive,
    padding: Spacing.lg,
    borderRadius: Radius.md,
    alignItems: "center",
  },
  logoutButtonText: {
    color: Theme.destructiveForeground,
    fontSize: Typography.size.md,
    fontFamily: Typography.family.semiBold,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});
