// screens/Home.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        {/* Logo Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Image source={require("../assets/cooking.jpg")} style={{ width: 120, height: 120, borderRadius: 60, }} />
          </View>
        </View>

        <Text style={styles.title}>Welcome</Text>

        {/* Buttons */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, styles.outlineButton]}
            onPress={() => navigation.navigate("Menu" as never)}
          >
            <Text style={styles.buttonText}>View Menu</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.outlineButton]}
            onPress={() => navigation.navigate("Manage" as never)}
          >
            <Text style={styles.buttonText}>Manage Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b49d9dd8",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  inner: {
    width: "100%",
    maxWidth: 360,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 20,
  },
  iconCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ff3300ff",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 40,
  },
  buttonGroup: {
    width: "100%",
    gap: 16,
  },
  button: {
    height: 56,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: "#111",
    backgroundColor: "transparent",
  },
  buttonText: {
    fontSize: 18,
    color: "#111",
    fontWeight: "600",
  },
});
