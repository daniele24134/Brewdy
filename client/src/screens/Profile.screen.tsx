import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const Profile: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});