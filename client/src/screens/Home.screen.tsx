import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { theme } from '../theme';
import { global } from '../theme';
import { fetchRandom } from '../services/apiService';
import { useUserContext } from '../User.provider';
import { beersParser } from '../utils';

export const Home: React.FC = ({navigation}: any) => {

  const {logout, user} = useUserContext();

  const handleRandom = async () =>{
    fetchRandom().then(
      (data) => {
        const beer = beersParser(data)[0]
        navigation.navigate('RandomBeer', beer)
      },
      (e:any) => {Alert.alert('Random beer not found')}
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainHome}>
        <Text style={[styles.title, global.bold]}>WELCOME {user?.username.toUpperCase()}</Text>
        <TouchableOpacity onPress={handleRandom} style={styles.mainButton}>
          <Text style={[styles.buttonText, global.semibold]}>START WITH A RANDOM BEER</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logoutHeader}>
        <TouchableOpacity style={global.button} onPress={logout}>
          <Text style={[global.buttonText, global.bold]}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgDark,
    padding: theme.padding,
  },
  title: {
    color: theme.textDark,
    fontSize: 50,
    textAlign: 'center',
    marginBottom:100,
  },

  mainHome: {
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
    marginBottom:100,
  },
  mainButton: {
    width: 280,
    backgroundColor: theme.buttonColor,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical:30,
  },
  buttonText: {
    fontSize:26,
    color: theme.textDark,
    textAlign:'center',
  },
  
  logoutHeader: {
    position: 'absolute',
    bottom: theme.padding,
    right: theme.padding,
  },

  buttonLogout:{
    backgroundColor: theme.buttonColor,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});