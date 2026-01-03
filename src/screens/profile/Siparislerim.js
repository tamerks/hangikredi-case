import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Theme, Typography, Spacing, Radius } from "../../constants/Theme";
import { Package, ChevronRight } from "lucide-react-native";

export default function Siparislerim({ navigation }) {
  const orders = [
    {
      id: "123456",
      date: "03.01.2024 - 14:30",
      total: "450.00",
      status: "Teslim Edildi",
      statusColor: "#16A34A", // Green
      items: "Süper Burger Menü (2)",
    },
    {
      id: "123457",
      date: "01.01.2024 - 19:15",
      total: "210.50",
      status: "Teslim Edildi",
      statusColor: "#16A34A",
      items: "Market Alışverişi",
    },
    {
      id: "123458",
      date: "28.12.2023 - 12:00",
      total: "125.00",
      status: "Hazırlanıyor",
      statusColor: "#EA580C", // Orange
      items: "Lahmacun (5)",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {orders.map((order) => (
          <TouchableOpacity
            key={order.id}
            style={styles.card}
            activeOpacity={0.8}
          >
            <View style={styles.header}>
              <View style={styles.iconBox}>
                <Package size={20} color={Theme.primary} />
              </View>
              <View>
                <Text style={styles.orderNo}>Sipariş #{order.id}</Text>
                <Text style={styles.date}>{order.date}</Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: order.statusColor + "20" },
                ]}
              >
                <Text style={[styles.statusText, { color: order.statusColor }]}>
                  {order.status}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <Text style={styles.itemsText}>{order.items}</Text>

            <View style={styles.footer}>
              <Text style={styles.totalLabel}>
                Toplam: <Text style={styles.totalValue}>₺{order.total}</Text>
              </Text>
              <View style={styles.detailButton}>
                <Text style={styles.detailText}>Detay</Text>
                <ChevronRight size={16} color={Theme.mutedForeground} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  },
  card: {
    backgroundColor: Theme.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Theme.border,
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    backgroundColor: Theme.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.sm,
  },
  orderNo: {
    fontSize: Typography.size.md,
    fontFamily: Typography.family.semiBold,
    color: Theme.foreground,
  },
  date: {
    fontSize: Typography.size.xs,
    fontFamily: Typography.family.regular,
    color: Theme.mutedForeground,
  },
  statusBadge: {
    marginLeft: "auto",
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  statusText: {
    fontSize: Typography.size.xs,
    fontFamily: Typography.family.medium,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.border,
    marginVertical: Spacing.sm,
  },
  itemsText: {
    fontSize: Typography.size.sm,
    color: Theme.foreground,
    marginBottom: Spacing.sm,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: Typography.size.sm,
    color: Theme.mutedForeground,
  },
  totalValue: {
    fontSize: Typography.size.md,
    fontFamily: Typography.family.bold,
    color: Theme.foreground,
  },
  detailButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    fontSize: Typography.size.sm,
    color: Theme.mutedForeground,
    marginRight: 2,
  },
});
