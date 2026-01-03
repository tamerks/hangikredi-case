import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Theme, Typography, Spacing, Radius } from "../../constants/Theme";
import { CreditCard, Plus, Trash2 } from "lucide-react-native";

export default function OdemeYontemleri({ navigation }) {
  const cards = [
    {
      id: 1,
      name: "Garanti Bonus",
      number: "•••• •••• •••• 1234",
      expiry: "12/26",
      color: "#166534", // Greenish
    },
    {
      id: 2,
      name: "Yapı Kredi World",
      number: "•••• •••• •••• 5678",
      expiry: "09/25",
      color: "#4F46E5", // Indigo
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {cards.map((card) => (
          <View
            key={card.id}
            style={[
              styles.card,
              { borderLeftColor: card.color, borderLeftWidth: 4 },
            ]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.chip} />
              <TouchableOpacity>
                <Trash2 size={20} color={Theme.destructive} />
              </TouchableOpacity>
            </View>

            <Text style={styles.cardNumber}>{card.number}</Text>

            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.label}>Kart Adı</Text>
                <Text style={styles.value}>{card.name}</Text>
              </View>
              <View>
                <Text style={styles.label}>S.K.T</Text>
                <Text style={styles.value}>{card.expiry}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton}>
          <Plus
            size={20}
            color={Theme.primaryForeground}
            style={{ marginRight: 8 }}
          />
          <Text style={styles.addButtonText}>Yeni Kart Ekle</Text>
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
  },
  card: {
    backgroundColor: Theme.card,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Theme.border,
    marginBottom: Spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    height: 180,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chip: {
    width: 40,
    height: 30,
    backgroundColor: "#EAB308",
    borderRadius: 4,
  },
  cardNumber: {
    fontSize: Typography.size.xl,
    fontFamily: Typography.family.mono || Typography.family.medium,
    color: Theme.foreground,
    letterSpacing: 2,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 10,
    color: Theme.mutedForeground,
    textTransform: "uppercase",
  },
  value: {
    fontSize: Typography.size.sm,
    fontFamily: Typography.family.semiBold,
    color: Theme.foreground,
  },
  footer: {
    padding: Spacing.xl,
    paddingBottom: Spacing.xl + 20,
    backgroundColor: Theme.background,
    borderTopWidth: 1,
    borderTopColor: Theme.border,
  },
  addButton: {
    backgroundColor: Theme.primary,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: Theme.primaryForeground,
    fontSize: Typography.size.md,
    fontFamily: Typography.family.semiBold,
  },
});
