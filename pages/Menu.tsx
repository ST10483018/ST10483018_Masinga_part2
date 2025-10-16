import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft } from "lucide-react-native";


type Course = "all" | "starters" | "mains" | "desserts";

interface MenuProps {
  menu: {
    id: string;
    name: string;
    description: string;
    price: string;
    course: "starters" | "mains" | "desserts";
  }[];
}

export default function Menu({ menu }: MenuProps) {
  const navigation = useNavigation();
  const [selectedCourse, setSelectedCourse] = useState<Course>("all");
  const [loading] = useState(false);

  /*Filter by the courses */
  const filteredItems =
    selectedCourse === "all"
      ? menu
      : menu.filter((item) => item.course === selectedCourse);

  /*Group by course for display */
  const groupedItems = filteredItems.reduce(
    (acc: Record<string, typeof menu>, item) => {
      if (!acc[item.course]) acc[item.course] = [];
      acc[item.course].push(item);
      return acc;
    },
    {}
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={28} color="#111" />
          </TouchableOpacity>
          <Text style={styles.title}>Christoffel’s Dining Menu</Text>
        </View>

        {/* Filter */}
        <Text style={styles.label}>Filter by Course</Text>
        <View style={styles.courseRow}>
          {(["all", "starters", "mains", "desserts"] as Course[]).map((c) => (
            <TouchableOpacity
              key={c}
              style={[
                styles.courseButton,
                selectedCourse === c && styles.courseButtonActive,
              ]}
              onPress={() => setSelectedCourse(c)}
            >
              <Text
                style={
                  selectedCourse === c
                    ? styles.courseTextActive
                    : styles.courseText
                }
              >
                {c.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu Items */}
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : filteredItems.length === 0 ? (
          <Text style={styles.emptyText}>No items available.</Text>
        ) : (
          <View style={styles.menuContainer}>
            {Object.keys(groupedItems).map((course) => (
              <View key={course} style={styles.section}>
                <Text style={styles.sectionTitle}>{course.toUpperCase()}</Text>
                {groupedItems[course].map((item) => (
                  <View key={item.id} style={styles.itemCard}>
                    <View>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemPrice}>R {item.price}</Text>
                      <Text style={styles.itemDescription}>
                        {item.description}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#d8ddddff" },
  content: { padding: 16, paddingBottom: 40 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: { marginRight: 8 },
  title: { fontSize: 24, fontWeight: "bold", flex: 1 },
  label: { fontWeight: "400", color: "#111111ff", marginBottom: 8, fontSize: 14 },
  courseRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  courseButton: {
    borderWidth: 1,
    borderColor: "#cccccc3d",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  courseButtonActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  courseText: { color: "#333" },
  courseTextActive: { color: "#fff", fontWeight: "600" },
  menuContainer: { marginTop: 10 },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "capitalize",
  },
  itemCard: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  itemName: { fontSize: 16, fontWeight: "500" },
  itemPrice: { color: "#666", marginTop: 4 },
  itemDescription: { color: "#444", marginTop: 6, fontSize: 13 },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#888",
    fontSize: 16,
  },
});
