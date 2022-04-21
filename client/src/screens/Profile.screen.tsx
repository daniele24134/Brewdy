import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { theme } from '../theme';
import { useUserContext } from '../User.provider';



export const Profile: React.FC = () => {

  const UserContext = useUserContext();

  return (
    <View style={styles.container}>
      <Text>Profile {UserContext.user?.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgDark,
    padding: 20
  },
});