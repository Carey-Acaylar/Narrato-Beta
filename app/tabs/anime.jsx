import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import { useStories } from "../context/StoriesContext";

export default function Anime() {
  const { addStory } = useStories();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handlePublish = () => {
    if (!title.trim() || !description.trim()) return;
    addStory(title, description);
    setTitle("");
    setDescription("");
    alert("✅ Story published!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>✍️ Publish a New Story</Text>

      <TextInput
        style={styles.input}
        placeholder="Story Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Story Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handlePublish}>
        <Text style={styles.buttonText}>Publish</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#f9fafb" },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#111827",
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
  textArea: { height: 120, textAlignVertical: "top" },
  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
