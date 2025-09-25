// app/(tabs)/home.jsx
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useStories } from "../context/StoriesContext";

const communityLists = [
  { id: "1", title: "The Village Champion", genre: "action", cover: "https://picsum.photos/200/300?1" },
  { id: "2", title: "Getting Wilder", genre: "lgbtq", cover: "https://picsum.photos/200/300?2" },
  { id: "3", title: "Lily & Rose", genre: "romance", cover: "https://picsum.photos/200/300?3" },
  { id: "4", title: "Fool Me Twice", genre: "drama", cover: "https://picsum.photos/200/300?4" },
];

const topPicks = [
  { id: "1", title: "The Cellar", genre: "published", cover: "https://picsum.photos/200/300?5" },
  { id: "2", title: "Bite Me", genre: "boyxboy", cover: "https://picsum.photos/200/300?6" },
  { id: "3", title: "The Player Next Door", genre: "romance", cover: "https://picsum.photos/200/300?7" },
  { id: "4", title: "Damien", genre: "thriller", cover: "https://picsum.photos/200/300?8" },
  { id: "5", title: "Forcefully Yours", genre: "mafia", cover: "https://picsum.photos/200/300?9" },
];

export default function Home() {
  const { stories } = useStories();

  const renderBook = ({ item }) => (
    <TouchableOpacity style={styles.bookCard}>
      <Image source={{ uri: item.cover }} style={styles.cover} />
      <Text style={styles.bookTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.genre}>{item.genre}</Text>
    </TouchableOpacity>
  );

  const renderStory = ({ item }) => (
    <View style={styles.storyCard}>
      <Text style={styles.storyTitle}>{item.title}</Text>
      <Text style={styles.storyDesc}>{item.description}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Your Published Stories Section */}
      <Text style={styles.sectionTitle}>Your Published Stories</Text>
      {stories.length === 0 ? (
        <Text style={styles.empty}>No stories yet. Publish from Anime tab.</Text>
      ) : (
        <FlatList
          data={stories}
          keyExtractor={(item) => item.id}
          renderItem={renderStory}
          scrollEnabled={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      )}

      {/* Community Section */}
      <Text style={styles.sectionTitle}>Reading lists from the community</Text>
      <FlatList
        data={communityLists}
        keyExtractor={(item) => item.id}
        renderItem={renderBook}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      {/* Top Picks Section */}
      <Text style={styles.sectionTitle}>Top picks for you</Text>
      <FlatList
        data={topPicks}
        keyExtractor={(item) => item.id}
        renderItem={renderBook}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  bookCard: {
    width: 140,
    marginRight: 16,
  },
  cover: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 8,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  genre: {
    fontSize: 12,
    color: "#6b7280",
  },
  empty: {
    color: "#6b7280",
    fontSize: 14,
    paddingHorizontal: 16,
  },
  storyCard: {
    backgroundColor: "#eef2ff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e3a8a",
  },
  storyDesc: {
    fontSize: 14,
    color: "#374151",
    marginTop: 4,
  },
});
