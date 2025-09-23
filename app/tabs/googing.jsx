
import { Ionicons } from "@expo/vector-icons";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const tags = [
  "romance", "love", "billionaire", "texttospeech", "arrangedmarriage",
  "slowburn", "india", "indian", "lovestory", "enemiestolovers",
];


const stories = [
  {
    id: "1",
    title: "His Replaced Bride",
    author: "Rach",
    reads: "1.8M",
    votes: "88.6K",
    comments: "65",
    cover: "https://picsum.photos/200/300?1",
    description: `"You're mine, Jeea. Don't ever forget that." His voice is a siren, enchanting me, making me dizzy with the need to be close...`,
    tags: ["Completed", "chicklit", "indianlovestory", "love"],
  },
  {
    id: "2",
    title: "Almost Professional",
    author: "Divinedendrites",
    reads: "80.1K",
    votes: "4.6K",
    comments: "85",
    cover: "https://picsum.photos/200/300?2",
    description: "Serii Joshi 24, just gave her NEET PG exam, and is waiting for her letter of acceptance for the residency...",
    tags: ["studentxprofessor", "hospital", "desi"],
  },
  {
    id: "3",
    title: "The Malhotras",
    author: "ritikaaauthor",
    reads: "1.1M",
    votes: "100K",
    comments: "135",
    cover: "https://picsum.photos/200/300?3",
    description: "This is a story of four brothers. The brothers who are ready to sacrifice their lives for each other in childhood...",
    tags: ["brotherhood", "bhai", "protective"],
  },
];

export default function Googing() {
  const renderTag = (tag) => (
    <TouchableOpacity key={tag} style={styles.tag}>
      <Text style={styles.tagText}>{tag} +</Text>
    </TouchableOpacity>
  );

  const renderStory = ({ item, index }) => (
    <View style={styles.storyCard}>
      <Image source={{ uri: item.cover }} style={styles.cover} />
      <View style={styles.storyInfo}>
        <Text style={styles.rank}>#{index + 1}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>by {item.author}</Text>
        <View style={styles.stats}>
          <Ionicons name="eye" size={14} color="#6b7280" />
          <Text style={styles.statText}>{item.reads}</Text>
          <Ionicons name="heart" size={14} color="#6b7280" style={{ marginLeft: 10 }} />
          <Text style={styles.statText}>{item.votes}</Text>
          <Ionicons name="chatbubble" size={14} color="#6b7280" style={{ marginLeft: 10 }} />
          <Text style={styles.statText}>{item.comments}</Text>
        </View>
        <Text style={styles.description} numberOfLines={3}>
          {item.description}
        </Text>
        <View style={styles.tagContainer}>
          {item.tags.map((t) => (
            <View key={t} style={styles.storyTag}>
              <Text style={styles.storyTagText}>{t}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
     
      <Text style={styles.refineTitle}>Refine by tag:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsRow}>
        {tags.map(renderTag)}
      </ScrollView>

      
      <Text style={styles.storyCount}>{stories.length} Stories</Text>
      <FlatList
        data={stories}
        keyExtractor={(item) => item.id}
        renderItem={renderStory}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 12 },
  refineTitle: { fontSize: 14, fontWeight: "600", color: "#374151", marginBottom: 8 },
  tagsRow: { flexDirection: "row", marginBottom: 12 },
  tag: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  tagText: { fontSize: 13, color: "#374151" },
  storyCount: { fontSize: 14, fontWeight: "500", color: "#6b7280", marginVertical: 8 },

  storyCard: { flexDirection: "row", marginBottom: 16 },
  cover: { width: 90, height: 130, borderRadius: 8, marginRight: 12 },
  storyInfo: { flex: 1 },
  rank: { color: "#ef4444", fontWeight: "700", marginBottom: 2 },
  title: { fontSize: 16, fontWeight: "700", color: "#111827" },
  author: { fontSize: 13, color: "#6b7280", marginBottom: 6 },
  stats: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  statText: { fontSize: 12, color: "#6b7280", marginLeft: 2 },
  description: { fontSize: 13, color: "#374151", marginBottom: 6 },
  tagContainer: { flexDirection: "row", flexWrap: "wrap" },
  storyTag: {
    backgroundColor: "#e5e7eb",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  storyTagText: { fontSize: 11, color: "#374151" },
});
