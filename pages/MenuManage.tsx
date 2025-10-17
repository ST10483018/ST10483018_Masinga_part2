import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft, Pencil, Trash2, } from "lucide-react-native";

type Course = "starters" | "mains" | "desserts";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  course: Course;
};

interface MenuManageProps {
  menu: MenuItem[];
  setMenu: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

export const MenuManage = ({ menu, setMenu }: MenuManageProps) => {
  const navigation = useNavigation();
  const [filterCourse, setFilterCourse] = useState<Course | "all">("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    course: "starters" as Course,
  });

  
  const menuItems = menu;


  const resetForm = () => {
    setFormData({ name: "", description: "", price: "", course: "starters" });
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.price) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (editingId) {
      /* Update existing */
      setMenu((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...formData } : item
        )
      );
      Alert.alert("Success", "Item updated successfully");
    } else {
      // Add new item
      const newItem: MenuItem = {
        id: Date.now().toString(),
        ...formData,
      };
      setMenu((prev) => [...prev, newItem]);
      Alert.alert("Success", "Item added successfully");
    }

    resetForm();
  };
  
  const handleEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      course: item.course,
    });
  };

  const handleDelete = (id: string) => {
    setMenu((prev) => prev.filter((item) => item.id !== id));
    Alert.alert("Deleted", "Item removed successfully");
  };

  const filteredItems =
    filterCourse === "all"
      ? menuItems
      : menuItems.filter((item) => item.course === filterCourse);

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
          <ChevronLeft size={28} color="#111" />
          </TouchableOpacity>
          <Text style={styles.title}>Christoffel’s Dining Manager</Text>
        </View>

        {/* Filter for dishes */}
        <View style={styles.courseRow}>
          {(["all", "starters", "mains", "desserts"] as (Course | "all")[]).map(
            (c) => (
              <TouchableOpacity
                key={c}
                style={[
                  styles.courseButton,
                  filterCourse === c && styles.courseButtonActive,
                ]}
                onPress={() => setFilterCourse(c)}
              >
                <Text
                  style={
                    filterCourse === c
                      ? styles.courseTextActive
                      : styles.courseText
                  }
                >
                  {c.toUpperCase()}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* Form for adding dishes */}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Dish Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Description"
            value={formData.description}
            multiline
            onChangeText={(text) => setFormData({ ...formData, description: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            keyboardType="numeric"
            value={formData.price}
            onChangeText={(text) => setFormData({ ...formData, price: text })}
          />

          <View style={styles.courseRow}>
            {(["starters", "mains", "desserts"] as Course[]).map((c) => (
              <TouchableOpacity
                key={c}
                style={[
                  styles.courseButton,
                  formData.course === c && styles.courseButtonActive,
                ]}
                onPress={() => setFormData({ ...formData, course: c })}
              >
                <Text
                  style={
                    formData.course === c
                      ? styles.courseTextActive
                      : styles.courseText
                  }
                >
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {editingId ? "Update Dish" : "Add Dish"}
            </Text>
          </TouchableOpacity>
        </View> 

        {/* List */}
        <View style={styles.list}>
          {filteredItems.length === 0 ? (
            <Text style={{ textAlign: "center", color: "#666" }}>
              No dishes yet.
            </Text> 
          ) : (
            filteredItems.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDescription}>
                    {item.description}
                  </Text>
                  <Text style={styles.itemPrice}>R{item.price}</Text>
                  <Text style={styles.itemCourse}>
                    Course: {item.course.toUpperCase()}
                  </Text>
                </View>
                <View style={styles.actions}>
                  <View style={styles.actions}>
                    <TouchableOpacity onPress={() => handleEdit(item)}>
                      <Pencil size={20} color="#333" style={styles.edit} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                      <Trash2 size={20} color="red" style={styles.delete} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#9fafa2ff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  form: { marginBottom: 24 },
  input: {
    borderWidth: 1,
    borderColor: "#000000ff",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: { marginRight: 0, marginBottom: 20, },
  label: { color: "#000000ff", marginBottom: 8, fontSize: 14 },
  courseRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  list: { gap: 10 },
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemName: { fontWeight: "bold", fontSize: 16 },
  itemDescription: { color: "#000000ff", fontSize: 13 },
  itemPrice: { color: "#333", marginTop: 4 },
  itemCourse: { color: "#777", fontSize: 12 },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  edit: { fontSize: 18, marginHorizontal: 8 },
  delete: { fontSize: 18, color: "red", marginHorizontal: 8 },
  courseButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  courseButtonActive: {
    backgroundColor: "#007AFF",
  },
  courseText: { color: "#333" },
  courseTextActive: { color: "#fff" },
});

