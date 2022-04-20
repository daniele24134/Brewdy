import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { PlusButton } from '../components/PlusButton';
import { theme } from '../theme';
import { global } from '../theme';
import { fetchRandom } from '../services/apiService';

export const Home: React.FC = ({navigation}: any) => {


  const handleRandom = async () =>{
    const beer = await fetchRandom();
    navigation.navigate('RandomBeer', beer)
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainHome}>
        <Text style={styles.title}>WELCOME USERNAME</Text>
        <TouchableOpacity onPress={handleRandom} style={styles.mainButton}>
          <Text style={styles.buttonText}>START WITH A RANDOM BEER</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logoutHeader}>
        <TouchableOpacity style={global.button}>
          <Text style={global.buttonText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
      <PlusButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgDark,
    padding: theme.padding
  },
  title: {
    color: theme.textDark,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom:100
  },

  mainHome: {
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
    marginBottom:100
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
    position: 'absolute',
    bottom: theme.padding,
    left: theme.padding
  },

  buttonLogout:{
    backgroundColor: theme.buttonColor,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15
  }
});