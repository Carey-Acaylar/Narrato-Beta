import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Award() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.text}>The Watty Awards</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Text style={styles.text}>Community Happenings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Text style={styles.text}>Wattpad Ambassadors</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  menu: {
    padding: 16,
  },
  row: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  text: {
    fontSize: 16,
    color: "#111",
  },
});
