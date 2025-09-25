import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useStories } from "../context/StoriesContext";

const communityLists = [
  {
    id: "1",
    title: "The Village Champion",
    genre: "action",
    cover: "https://picsum.photos/200/300?1",
    description: "A small-town boxer rises against all odds to defend his village.",
    chapters: [
      { title: "The Bell Rings", date: "Mon, Jan 20, 2025" },
      { title: "Gloves & Grit", date: "Tue, Jan 21, 2025" },
      { title: "Bruised Pride", date: "Wed, Jan 22, 2025" },
      { title: "The Challenger", date: "Thu, Jan 23, 2025" },
      { title: "Blood on the Canvas", date: "Fri, Jan 24, 2025" },
      { title: "Echoes of the Crowd", date: "Mon, Jan 27, 2025" },
      { title: "The Final Round", date: "Tue, Jan 28, 2025" },
    ],
  },
  {
    id: "2",
    title: "Getting Wilder",
    genre: "lgbtq",
    cover: "https://picsum.photos/200/300?2",
    description: "Two souls find love and liberation in the wild unknown.",
    chapters: [
      { title: "Runaways & Rainstorms", date: "Mon, Jan 20, 2025" },
      { title: "Wild Hearts, Soft Hands", date: "Tue, Jan 21, 2025" },
      { title: "Campfire Confessions", date: "Wed, Jan 22, 2025" },
      { title: "The Edge of Us", date: "Thu, Jan 23, 2025" },
      { title: "Bruised but Blooming", date: "Fri, Jan 24, 2025" },
      { title: "The Reckoning", date: "Mon, Jan 27, 2025" },
      { title: "Home Isn’t a Place", date: "Tue, Jan 28, 2025" },
    ],
  },
  {
    id: "3",
    title: "Lily & Rose",
    genre: "romance",
    cover: "https://picsum.photos/200/300?3",
    description: "A forbidden love blooms between two childhood friends.",
    chapters: [
      { title: "Petal by Petal", date: "Mon, Jan 20, 2025" },
      { title: "The Garden Gate", date: "Tue, Jan 21, 2025" },
      { title: "Secrets in Bloom", date: "Wed, Jan 22, 2025" },
      { title: "Thorns Between Us", date: "Thu, Jan 23, 2025" },
      { title: "Rain on the Letters", date: "Fri, Jan 24, 2025" },
      { title: "The Last Bouquet", date: "Mon, Jan 27, 2025" },
      { title: "Love, Rewritten", date: "Tue, Jan 28, 2025" },
    ],
  },
  {
    id: "4",
    title: "Fool Me Twice",
    genre: "drama",
    cover: "https://picsum.photos/200/300?4",
    description: "Secrets unravel when a con artist falls for their mark.",
    chapters: [
      { title: "The Setup", date: "Mon, Jan 20, 2025" },
      { title: "Velvet Lies", date: "Tue, Jan 21, 2025" },
      { title: "Smoke & Mirrors", date: "Wed, Jan 22, 2025" },
      { title: "The Mark", date: "Thu, Jan 23, 2025" },
      { title: "Hearts on the Line", date: "Fri, Jan 24, 2025" },
      { title: "The Reveal", date: "Mon, Jan 27, 2025" },
      { title: "Fool Me Forever", date: "Tue, Jan 28, 2025" },
    ],
  },
];

const topPicks = [
  {
    id: "1",
    title: "The Cellar",
    genre: "published",
    cover: "https://picsum.photos/200/300?5",
    description: "A chilling tale of survival beneath the surface.",
    chapters: [
      { title: "Locked In", date: "Mon, Jan 20, 2025" },
      { title: "Scratches in the Dark", date: "Tue, Jan 21, 2025" },
      { title: "The Whispering Wall", date: "Wed, Jan 22, 2025" },
      { title: "False Light", date: "Thu, Jan 23, 2025" },
      { title: "The Escape Plan", date: "Fri, Jan 24, 2025" },
      { title: "Above Ground", date: "Mon, Jan 27, 2025" },
      { title: "What Was Buried", date: "Tue, Jan 28, 2025" },
    ],
  },
  {
    id: "2",
    title: "Bite Me",
    genre: "boyxboy",
    cover: "https://picsum.photos/200/300?6",
    description: "A vampire romance that bites back.",
    chapters: [
      { title: "Crimson Eyes", date: "Mon, Jan 20, 2025" },
      { title: "Moonlit Mischief", date: "Tue, Jan 21, 2025" },
      { title: "The Pact", date: "Wed, Jan 22, 2025" },
      { title: "Hunger Games", date: "Thu, Jan 23, 2025" },
      { title: "Fangs & Feelings", date: "Fri, Jan 24, 2025" },
      { title: "Eternal Night", date: "Mon, Jan 27, 2025" },
      { title: "Bite Back", date: "Tue, Jan 28, 2025" },
    ],
  },
  {
    id: "3",
    title: "The Player Next Door",
    genre: "romance",
    cover: "https://picsum.photos/200/300?7",
    description: "She swore off love—until he moved in next door.",
    chapters: [
      { title: "New Neighbor", date: "Mon, Jan 20, 2025" },
      { title: "Flirting Games", date: "Tue, Jan 21, 2025" },
      { title: "The Dare", date: "Wed, Jan 22, 2025" },
      { title: "Mixed Signals", date: "Thu, Jan 23, 2025" },
      { title: "The Kiss", date: "Fri, Jan 24, 2025" },
      { title: "The Fallout", date: "Mon, Jan 27, 2025" },
      { title: "Love Next Door", date: "Tue, Jan 28, 2025" },
    ],
  },
  {
    id: "4",
    title: "Damien",
    genre: "thriller",
    cover: "https://picsum.photos/200/300?8",
    description: "A detective haunted by a case that never closed.",
    chapters: [
      { title: "The Crime Scene", date: "Mon, Jan 20, 2025" },
      { title: "Red Threads", date: "Tue, Jan 21, 2025" },
      { title: "The Witness", date: "Wed, Jan 22, 2025" },
      { title: "Night Shift", date: "Thu, Jan 23, 2025" },
      { title: "The Pattern", date: "Fri, Jan 24, 2025" },
      { title: "The Confession", date: "Mon, Jan 27, 2025" },
      { title: "Damien’s Truth", date: "Tue, Jan 28, 2025" },
    ],
  },
 {
  id: "5",
  title: "Forcefully Yours",
  genre: "mafia",
  cover: "https://picsum.photos/200/300?9",
  description: "A mafia heir and a kidnapped journalist—bound by fate.",
  chapters: [
    { title: "Taken", date: "Mon, Jan 20, 2025" },
    { title: "The Mansion", date: "Tue, Jan 21, 2025" },
    { title: "Power Play", date: "Wed, Jan 22, 2025" },
    { title: "Velvet Chains", date: "Thu, Jan 23, 2025" },
    { title: "The Deal", date: "Fri, Jan 24, 2025" },
    { title: "The Escape", date: "Mon, Jan 27, 2025" },
    { title: "Yours, Forcefully", date: "Tue, Jan 28, 2025" },
  ],
},
];

  export default function Home() {
    const { stories } = useStories();
    const router = useRouter();

    const renderBook = ({ item }) => (
    <TouchableOpacity
      style={styles.bookCard}
      onPress={() =>
        router.push({
          pathname: "/stories/[id]",
          params: {
            id: item.id,
            title: item.title,
            genre: item.genre,
            cover: item.cover,
            description: item.description,
            chapters: JSON.stringify(item.chapters),
          },
        })
      }
    >
      <Image source={{ uri: item.cover }} style={styles.cover} />
      <Text style={styles.bookTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.genre}>{item.genre}</Text>
    </TouchableOpacity>
  );


    const renderStory = ({ item }) => (
    <TouchableOpacity
      style={styles.storyCard}
      onPress={() =>
        router.push({
          pathname: "/stories/[id]",
          params: {
            id: item.id,
            title: item.title,
            description: item.description,
            status: item.status,
            chapters: JSON.stringify(item.chapters),
          },
        })
      }
    >
      <Text style={styles.storyTitle}>{item.title}</Text>
      <Text style={styles.storyDesc}>{item.description}</Text>
      <Text style={[styles.status, item.status === "Completed" && styles.completed]}>
        {item.status}
      </Text>
    </TouchableOpacity>
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
  status: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "500",
    color: "#10b981",
  },
  completed: {
    color: "#ef4444",
  },
});
