import { useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import { Animated, Dimensions, PanResponder, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ChapterReader() {
  const { title, chapterTitle } = useLocalSearchParams();
  const screenWidth = Dimensions.get("window").width;
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 20,
    onPanResponderMove: Animated.event([null, { dx: translateX }], { useNativeDriver: false }),
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 100) {
        Animated.spring(translateX, {
          toValue: screenWidth,
          useNativeDriver: false,
        }).start(() => {
          // TODO: Navigate to previous chapter
        });
      } else if (gestureState.dx < -100) {
        Animated.spring(translateX, {
          toValue: -screenWidth,
          useNativeDriver: false,
        }).start(() => {
          // TODO: Navigate to next chapter
        });
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.page, { transform: [{ translateX }] }]} {...panResponder.panHandlers}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.chapterTitle}>{chapterTitle}</Text>
          <Text style={styles.body}>
            {/* Replace with actual chapter content */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. 
            Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie...
          </Text>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  page: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e3a8a",
    marginBottom: 6,
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 16,
  },
  body: {
    fontSize: 16,
    color: "#111827",
    lineHeight: 26,
  },
});
