import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const Search: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Search</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});