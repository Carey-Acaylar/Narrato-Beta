import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../../firebaseConfig";


const StoriesContext = createContext();

export function StoriesProvider({ children }) {
  const [stories, setStories] = useState([]);

  // 🔹 Load stories from Firestore on mount
  useEffect(() => {
    const fetchStories = async () => {
      const snapshot = await getDocs(collection(db, "stories"));
      const storiesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStories(storiesData);
    };

    fetchStories();
  }, []);
  
  function StoryItem({ story }) {
  const { deleteStory } = useStories();

  const handleDelete = () => {
    deleteStory(story.id);
  };

  return (
    <div>
      <h3>{story.title}</h3>
      <p>{story.description}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

 const sanitize = (value, fallback = "") =>
  typeof value === "string" ? value.trim() || fallback : fallback;

const addStory = async (storyData) => {
  const safeStory = {
    title: sanitize(storyData.title, "Untitled"),
    description: sanitize(storyData.description, "No description provided"),
    category: sanitize(storyData.category, "uncategorized"),
    cover: typeof storyData.cover === "string" ? storyData.cover : null,
    characters: Array.isArray(storyData.characters)
      ? storyData.characters.filter((c) => typeof c === "string" && c.trim())
      : [],
  };

  await addDoc(collection(db, "stories"), safeStory);
};


  // 🔹 UPDATE
  const updateStory = async (id, updatedTitle, updatedDescription) => {
    const storyRef = doc(db, "stories", id);
    await updateDoc(storyRef, {
      title: updatedTitle,
      description: updatedDescription,
    });

    setStories(
      stories.map((story) =>
        story.id === id
          ? { ...story, title: updatedTitle, description: updatedDescription }
          : story
      )
    );
  };

  // 🔹 DELETE
  const deleteStory = async (id) => {
    await deleteDoc(doc(db, "stories", id));
    setStories(stories.filter((story) => story.id !== id));
  };

  return (
    <StoriesContext.Provider
      value={{ stories, addStory, updateStory, deleteStory}}
    >
      {children}
    </StoriesContext.Provider>
  );
}

// 🔹 Custom hook
export function useStories() {
  return useContext(StoriesContext);
}
