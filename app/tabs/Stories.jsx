// import { useState } from "react";
// import {
//     FlatList,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from "react-native";

// export default function Stories() {
//   const [stories, setStories] = useState([]);
//   const [title, setTitle] = useState("");
//   const [editingId, setEditingId] = useState(null);

//   // CREATE
//   const addStory = () => {
//     if (title.trim() === "") return;
//     if (editingId) {
//       // UPDATE
//       setStories(
//         stories.map((story) =>
//           story.id === editingId ? { ...story, title } : story
//         )
//       );
//       setEditingId(null);
//     } else {
//       setStories([...stories, { id: Date.now().toString(), title }]);
//     }
//     setTitle("");
//   };

//   // DELETE
//   const deleteStory = (id) => {
//     setStories(stories.filter((story) => story.id !== id));
//   };

//   // EDIT (prepare to update)
//   const editStory = (story) => {
//     setTitle(story.title);
//     setEditingId(story.id);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>📚 My Stories</Text>

//       {/* Input field */}
//       <View style={styles.inputRow}>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter story title"
//           value={title}
//           onChangeText={setTitle}
//         />
//         <TouchableOpacity style={styles.button} onPress={addStory}>
//           <Text style={styles.buttonText}>
//             {editingId ? "Update" : "Add"}
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* READ (list stories) */}
//       <FlatList
//         data={stories}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.storyRow}>
//             <Text style={styles.storyText}>{item.title}</Text>
//             <View style={styles.actions}>
//               <TouchableOpacity onPress={() => editStory(item)}>
//                 <Text style={styles.edit}>Edit</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => deleteStory(item.id)}>
//                 <Text style={styles.delete}>Delete</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 15,
//   },
//   inputRow: {
//     flexDirection: "row",
//     marginBottom: 15,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//   },
//   button: {
//     backgroundColor: "#2563eb",
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "600",
//   },
//   storyRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   storyText: {
//     fontSize: 16,
//     color: "#111",
//   },
//   actions: {
//     flexDirection: "row",
//     gap: 15,
//   },
//   edit: {
//     color: "#2563eb",
//     marginRight: 10,
//   },
//   delete: {
//     color: "#dc2626",
//   },
// });
