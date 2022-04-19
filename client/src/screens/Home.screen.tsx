import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { PlusButton } from '../components/PlusButton';
import { theme } from '../theme';

export const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mainHome}>
        <Text style={styles.title}>WELCOME USERNAME</Text>
        <TouchableOpacity style={styles.mainButton}>
          <Text style={styles.buttonText}>START WITH A RANDOM BEER</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logoutHeader}>
        <TouchableOpacity style={styles.buttonLogout}>
          <Text style={styles.buttonText}>LOGOUT</Text>
        </TouchableOpacity>
        <PlusButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgDark,
    padding:20
  },
  title: {
    color: theme.textDark,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  mainHome: {
    flex:1,
    alignItems:'center',
    justifyContent: 'space-around'
  },
  mainButton: {
    width: 280,
    backgroundColor: theme.buttonColor,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical:30
  },
  buttonText: {
    fontSize:26,
    color: theme.textDark,
    textAlign:'center'
  },
  
  logoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    marginTop: 50
  },

  buttonLogout:{
    backgroundColor: theme.buttonColor,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15
  }
});