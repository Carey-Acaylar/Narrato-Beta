import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function StoryDetail() {
  const { title, genre, cover, description, chapters } = useLocalSearchParams();
  const router = useRouter();
  const chapterList = JSON.parse(chapters || "[]");

  const handleStartReading = () => {
    if (chapterList.length > 0) {
      router.push({
        pathname: "/stories/chapter",
        params: {
          title,
          chapterTitle: chapterList[0].title,
        },
      });
    } else {
      Alert.alert("No chapters available");
    }
  };

  const handleChapterPress = (chapter) => {
    router.push({
      pathname: "/stories/chapter",
      params: {
        title,
        chapterTitle: chapter.title,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: cover }} style={styles.cover} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.genre}>{genre}</Text>
      <Text style={styles.description}>{description}</Text>

      <TouchableOpacity style={styles.readButton} onPress={handleStartReading}>
        <Text style={styles.readButtonText}>Start Reading</Text>
      </TouchableOpacity>

      <Text style={styles.chapterHeader}>Table of Contents</Text>
      <FlatList
        data={chapterList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.chapterRow} onPress={() => handleChapterPress(item)}>
            <Text style={styles.chapterTitle}>{index + 1}) {item.title}</Text>
            <Text style={styles.chapterDate}>{item.date}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.chapterList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9fafb",
    flex: 1,
  },
  cover: {
    width: "100%",
    height: 280,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1e3a8a",
    marginBottom: 4,
  },
  genre: {
    fontSize: 15,
    color: "#6b7280",
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: "#374151",
    marginBottom: 20,
  },
  readButton: {
    backgroundColor: "#4f46e5",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  readButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  chapterHeader: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  chapterList: {
    paddingBottom: 16,
  },
  chapterRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  chapterTitle: {
    fontSize: 16,
    color: "#1f2937",
    fontWeight: "500",
  },
  chapterDate: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
});
