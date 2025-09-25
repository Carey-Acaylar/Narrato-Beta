import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useStories } from "../context/StoriesContext";
import { getAuth } from "firebase/auth";

export default function Write() {
  const { addStory } = useStories();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [characters, setCharacters] = useState([""]);
  const [category, setCategory] = useState("");
  const [cover, setCover] = useState(null);

  const handleUploadCover = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setCover(result.assets[0].uri);
    }
  };

  const handlePublish = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to publish.");
      return;
    }

    const safeTitle = typeof title === "string" ? title.trim() : "Untitled";
    const safeDescription =
      typeof description === "string" ? description.trim() : "No description provided";
    const safeCategory =
      typeof category === "string" ? category.trim() : "uncategorized";
    const safeCover = typeof cover === "string" ? cover : null;
    const safeCharacters = Array.isArray(characters)
      ? characters.filter((c) => typeof c === "string" && c.trim())
      : [];

    if (!safeTitle || !safeDescription) {
      alert("Please fill in the title and description.");
      return;
    }

    const storyData = {
      title: safeTitle,
      description: safeDescription,
      category: safeCategory,
      cover: safeCover,
      characters: safeCharacters,
      authorId: user.uid, // 🔐 Track who created it
    };

    addStory(storyData);
    setTitle("");
    setDescription("");
    setCharacters([""]);
    setCategory("");
    setCover(null);
    alert("✅ Story published!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>✍️ Add Story Info</Text>

      <Text style={styles.label}>Cover Image</Text>
      {cover ? (
        <Image source={{ uri: cover }} style={styles.coverPreview} />
      ) : (
        <Text style={styles.placeholder}>No cover selected</Text>
      )}
      <TouchableOpacity style={styles.uploadButton} onPress={handleUploadCover}>
        <Text style={styles.uploadButtonText}>Upload Cover</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Untitled Story"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Write a short synopsis..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Main Characters</Text>
      {characters.map((char, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Character ${index + 1}`}
          value={char}
          onChangeText={(text) => {
            const updated = [...characters];
            updated[index] = text;
            setCharacters(updated);
          }}
        />
      ))}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setCharacters([...characters, ""])}
      >
        <Text style={styles.addButtonText}>+ Add Character</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={category}
          onValueChange={(value) => setCategory(value)}
          style={styles.picker}
        >
          <Picker.Item label="Select a category" value="" />
          <Picker.Item label="Romance 💖" value="romance" />
          <Picker.Item label="Thriller 🔪" value="thriller" />
          <Picker.Item label="Fantasy 🐉" value="fantasy" />
          <Picker.Item label="Drama 🎭" value="drama" />
          <Picker.Item label="LGBTQ 🏳️‍🌈" value="lgbtq" />
          <Picker.Item label="Mafia 🔫" value="mafia" />
          <Picker.Item label="Boy x Boy 🧛‍♂️" value="boyxboy" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePublish}>
        <Text style={styles.buttonText}>Publish</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#f9fafb" },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
    color: "#111827",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#374151",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  addButton: {
    backgroundColor: "#e0e7ff",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#1e3a8a",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  coverPreview: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
  },
  placeholder: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 12,
  },
  uploadButton: {
    backgroundColor: "#e0e7ff",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 20,
  },
  uploadButtonText: {
    color: "#1e3a8a",
    fontWeight: "600",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    width: "100%",
  },
});
