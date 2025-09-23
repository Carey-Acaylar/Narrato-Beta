import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useStories } from "../context/StoriesContext";

export default function Profile() {
  const { stories, deleteStory, updateStory } = useStories();
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://i.imgur.com/qEf2vyo.jpg" }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text style={styles.name}>Carey_Acaylar</Text>
        <Text style={styles.bio}>
          ✍️ Storyteller of fantasy and adventures. Sharing worlds one chapter
          at a time.
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{stories.length}</Text>
          <Text style={styles.statLabel}>Novels</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>
            {stories.reduce((acc, s) => acc + (s.chapters || 1), 0)}
          </Text>
          <Text style={styles.statLabel}>Chapters</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>120</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>My Novels</Text>
      {stories.length === 0 ? (
        <Text style={styles.empty}>No stories published yet.</Text>
      ) : (
        <FlatList
          data={stories}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <View style={styles.novelCard}>
              <Image
                source={{
                  uri: item.cover || "https://picsum.photos/200/300?random",
                }}
                style={styles.novelCover}
              />
              <Text style={styles.novelTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.novelChapters}>
                {item.chapters || 1} Chapters
              </Text>

              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => {
                    setEditingId(item.id);
                    setNewTitle(item.title);
                    setNewDescription(item.description || "");
                  }}
                >
                  <Text style={styles.edit}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteStory(item.id)}>
                  <Text style={styles.delete}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {/* Edit Form */}
      {editingId && (
        <View style={styles.editForm}>
          <Text style={styles.editFormTitle}>Edit Story</Text>
          <TextInput
            placeholder="Title"
            value={newTitle}
            onChangeText={setNewTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={newDescription}
            onChangeText={setNewDescription}
            style={[styles.input, { height: 80 }]}
            multiline
          />
          <TouchableOpacity
            onPress={() => {
              updateStory(editingId, newTitle, newDescription);
              setEditingId(null);
              setNewTitle("");
              setNewDescription("");
            }}
            style={styles.saveButton}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  avatar: { width: 90, height: 90, borderRadius: 45, marginBottom: 12 },
  name: { fontSize: 20, fontWeight: "700", color: "#111827" },
  bio: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 6,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  statBox: { alignItems: "center" },
  statNumber: { fontSize: 18, fontWeight: "700", color: "#4f46e5" },
  statLabel: { fontSize: 14, color: "#6b7280", marginTop: 2 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  empty: {
    fontSize: 14,
    color: "#6b7280",
    paddingHorizontal: 16,
  },
  novelCard: {
    width: 160,
    marginRight: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    paddingBottom: 8,
  },
  novelCover: { width: "100%", height: 180 },
  novelTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginTop: 8,
    marginHorizontal: 8,
  },
  novelChapters: {
    fontSize: 12,
    color: "#6b7280",
    marginHorizontal: 8,
    marginBottom: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    marginTop: 4,
  },
  edit: { fontSize: 12, color: "#2563eb", fontWeight: "600" },
  delete: { fontSize: 12, color: "#dc2626", fontWeight: "600" },
  editForm: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  editFormTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111827",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
    color: "#111827",
    backgroundColor: "#f9fafb",
  },
  saveButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 6,
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 14,
  },
});
