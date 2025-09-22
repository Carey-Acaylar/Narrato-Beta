import { createContext, useContext, useState } from "react";

const StoriesContext = createContext();

export function StoriesProvider({ children }) {
  const [stories, setStories] = useState([]);

  // CREATE
  const addStory = (title, description) => {
    const newStory = {
      id: Date.now().toString(),
      title,
      description,
      createdAt: new Date(),
    };
    setStories([newStory, ...stories]);
  };

  // READ is just accessing "stories" via useStories()

  // UPDATE
  const updateStory = (id, updatedTitle, updatedDescription) => {
    setStories(
      stories.map((story) =>
        story.id === id
          ? { ...story, title: updatedTitle, description: updatedDescription }
          : story
      )
    );
  };

  // DELETE
  const deleteStory = (id) => {
    setStories(stories.filter((story) => story.id !== id));
  };

  return (
    <StoriesContext.Provider
      value={{ stories, addStory, updateStory, deleteStory }}
    >
      {children}
    </StoriesContext.Provider>
  );
}

// Custom hook for consuming context
export function useStories() {
  return useContext(StoriesContext);
}
