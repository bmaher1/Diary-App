import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions, PanResponder, Animated } from 'react-native';
import Entry from '../components/Entry';

const { width } = Dimensions.get('window');

const diaryEntries = [
  { id: '1', text: 'Sample Entry 1' },
  { id: '2', text: 'Sample Entry 2' },
  { id: '3', text: 'Sample Entry 3' },
];

const Feed = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: (_, gestureState) =>
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
      onPanResponderMove: Animated.event(
        [null, { dx: scrollX }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gestureState) => {
        const swipeThreshold = width * 0.25; // Adjust the sensitivity here (default: 0.25)
        const dx = gestureState.dx;

        if (Math.abs(dx) > swipeThreshold) {
          const scrollIndex = dx > 0 ? -1 : 1;
          const newIndex = Math.max(0, Math.min(diaryEntries.length - 1, currentIndex.current + scrollIndex));
          currentIndex.current = newIndex;

          flatListRef.current.scrollToIndex({
            index: newIndex,
            animated: true,
          });
        } else {
          flatListRef.current.scrollToIndex({
            index: currentIndex.current,
            animated: true,
          });
        }
      },
    })
  ).current;

  const renderEntryItem = ({ item }) => (
    <View style={styles.entryContainer}>
      <Entry text={item.text} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={diaryEntries}
        renderItem={renderEntryItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate="fast"
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  entryContainer: {
    flex: 1,
    width: width,
  },
});

export default Feed;
