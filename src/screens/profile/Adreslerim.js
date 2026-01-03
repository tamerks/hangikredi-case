import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Theme, Typography, Spacing, Radius } from "../../constants/Theme";
import { MapPin, Plus } from "lucide-react-native";

export default function Adreslerim({ navigation }) {
  const addresses = [
    {
      id: 1,
      title: "Ev Adresim",
      address: "Caferağa Mah. Moda Cad. No: 123 D: 4\nKadıköy / İstanbul",
      type: "ev",
    },
    {
      id: 2,
      title: "İş Adresi",
      address: "Esentepe Mah. Büyükdere Cad. No: 45\nŞişli / İstanbul",
      type: "is",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {addresses.map((addr) => (
          <View key={addr.id} style={styles.card}>
            <View style={styles.iconContainer}>
              <MapPin size={24} color={Theme.primary} />
            </View>
            <View style={styles.info}>
              <Text style={styles.title}>{addr.title}</Text>
              <Text style={styles.address}>{addr.address}</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Düzenle</Text>
            </TouchableOpacity>
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
          <Text style={styles.addButtonText}>Yeni Adres Ekle</Text>
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    backgroundColor: Theme.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: Typography.size.md,
    fontFamily: Typography.family.semiBold,
    color: Theme.foreground,
    marginBottom: 4,
  },
  address: {
    fontSize: Typography.size.sm,
    fontFamily: Typography.family.regular,
    color: Theme.mutedForeground,
    lineHeight: 20,
  },
  editButton: {
    paddingHorizontal: Spacing.sm,
  },
  editButtonText: {
    fontSize: Typography.size.sm,
    fontFamily: Typography.family.medium,
    color: Theme.primary,
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
