import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Entry = ({ text }) => (
  <View style={styles.entryContainer}>
    <Text style={styles.entryText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  entryContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  entryText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Entry;
