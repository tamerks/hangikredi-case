import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import { clearCart as clearYemekCart } from "../../redux/slices/yemekCartSlice";
import { clearCart as clearMarketCart } from "../../redux/slices/marketCartSlice";
import Toast from "react-native-toast-message";
import { Theme, Typography, Spacing, Radius } from "../../constants/Theme";

export default function OdemeEkrani({ navigation, route }) {
  const { totalAmount, type } = route.params || {
    totalAmount: 0,
    type: "yemek",
  };
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState("ev");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  const handlePayment = () => {
    setLoading(true);

    // Mock API call
    setTimeout(() => {
      setLoading(false);

      // Clear relevant cart
      if (type === "yemek") {
        dispatch(clearYemekCart());
      } else {
        dispatch(clearMarketCart());
      }

      navigation.replace("SiparisSonuc");
    }, 2000);
  };

  const renderRadio = (selected, value, label, onPress) => (
    <TouchableOpacity
      style={[styles.radioItem, selected === value && styles.radioItemSelected]}
      onPress={() => onPress(value)}
      activeOpacity={0.8}
    >
      <View style={styles.radioOuter}>
        {selected === value && <View style={styles.radioInner} />}
      </View>
      <Text
        style={[
          styles.radioLabel,
          selected === value && styles.radioLabelSelected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Adres Seçimi */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Teslimat Adresi</Text>
          <View style={styles.card}>
            {renderRadio(
              selectedAddress,
              "ev",
              "Ev Adresi (Kadıköy/İstanbul)",
              setSelectedAddress
            )}
            <View style={styles.divider} />
            {renderRadio(
              selectedAddress,
              "is",
              "İş Adresi (Levent/İstanbul)",
              setSelectedAddress
            )}
          </View>
        </View>

        {/* Ödeme Yöntemi */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ödeme Yöntemi</Text>
          <View style={styles.card}>
            {renderRadio(
              paymentMethod,
              "credit_card",
              "Kredi / Banka Kartı",
              setPaymentMethod
            )}
            <View style={styles.divider} />
            {renderRadio(
              paymentMethod,
              "cash",
              "Kapıda Nakit Ödeme",
              setPaymentMethod
            )}
            <View style={styles.divider} />
            {renderRadio(
              paymentMethod,
              "yemek_karti",
              "Yemek Kartı (Sodexo/Ticket)",
              setPaymentMethod
            )}
          </View>
        </View>

        {/* Kredi Kartı Formu (Mock) */}
        {paymentMethod === "credit_card" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Kart Bilgileri</Text>
            <View style={styles.card}>
              <TextInput
                style={styles.input}
                placeholder="Kart Numarası"
                placeholderTextColor={Theme.mutedForeground}
                keyboardType="numeric"
              />
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, { flex: 1, marginRight: Spacing.md }]}
                  placeholder="AA/YY"
                  placeholderTextColor={Theme.mutedForeground}
                />
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="CVC"
                  placeholderTextColor={Theme.mutedForeground}
                  keyboardType="numeric"
                  secureTextEntry
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Kart Üzerindeki İsim"
                placeholderTextColor={Theme.mutedForeground}
              />
            </View>
          </View>
        )}

        {/* Özet */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sipariş Özeti</Text>
          <View style={styles.card}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Ara Toplam</Text>
              <Text style={styles.summaryValue}>₺{totalAmount}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Teslimat Ücreti</Text>
              <Text style={styles.summaryValue}>₺0.00</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Toplam</Text>
              <Text style={styles.totalValue}>₺{totalAmount}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.payButton}
          onPress={handlePayment}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={Theme.primaryForeground} />
          ) : (
            <Text style={styles.payButtonText}>
              Siparişi Onayla (₺{totalAmount})
            </Text>
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
  content: {
    padding: Spacing.lg,
    paddingBottom: 100,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.size.md,
    fontFamily: Typography.family.semiBold,
    color: Theme.mutedForeground,
    marginBottom: Spacing.sm,
    marginLeft: Spacing.xs,
  },
  card: {
    backgroundColor: Theme.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Theme.border,
    padding: Spacing.md,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.sm,
  },
  radioItemSelected: {
    // Optional highlight
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Theme.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Theme.primary,
  },
  radioLabel: {
    fontSize: Typography.size.md,
    fontFamily: Typography.family.medium,
    color: Theme.foreground,
  },
  radioLabelSelected: {
    fontFamily: Typography.family.semiBold,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.border,
    marginVertical: Spacing.sm,
  },
  input: {
    backgroundColor: Theme.secondary,
    borderRadius: Radius.md,
    padding: Spacing.md,
    fontSize: Typography.size.md,
    fontFamily: Typography.family.regular,
    color: Theme.foreground,
    marginBottom: Spacing.md,
  },
  row: {
    flexDirection: "row",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.sm,
  },
  summaryLabel: {
    fontSize: Typography.size.md,
    color: Theme.mutedForeground,
  },
  summaryValue: {
    fontSize: Typography.size.md,
    color: Theme.foreground,
    fontFamily: Typography.family.medium,
  },
  totalRow: {
    marginTop: Spacing.xs,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Theme.border,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: Typography.size.lg,
    fontFamily: Typography.family.bold,
    color: Theme.foreground,
  },
  totalValue: {
    fontSize: Typography.size.xl,
    fontFamily: Typography.family.bold,
    color: Theme.primary,
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
    paddingBottom: Spacing.xl + 20,
  },
  payButton: {
    backgroundColor: Theme.primary,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    alignItems: "center",
  },
  payButtonText: {
    color: Theme.primaryForeground,
    fontSize: Typography.size.lg,
    fontFamily: Typography.family.bold,
  },
});
