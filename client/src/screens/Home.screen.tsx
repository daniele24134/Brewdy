import React from 'react';
import { 
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Switch
} from 'react-native';
import { theme } from '../theme';
import { global } from '../theme';
import { fetchRandom } from '../services/apiService';
import { useUserContext } from '../User.provider';
import { beersParser } from '../utils';
import { useThemeContext } from '../Theme.provider';
const imgBack = require('../../assets/homeBackground.jpg');

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

  const { isDark, themeStyle, toggleTheme } = useThemeContext();

  return (
    <ImageBackground style={{flex: 1}} source={imgBack}>
      <View style={styles.container}>
      <View style={styles.mainHome}>
        <Text style={[styles.title, global.bold]}>WELCOME {user?.username.toUpperCase()}</Text>
        <TouchableOpacity onPress={handleRandom} style={styles.mainButton}>
          <Text style={[styles.buttonText, global.semibold]}>START WITH A RANDOM BEER</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logoutHeader}>
        <Switch
          trackColor={{ false: theme.buttonColor, true: theme.buttonColor }}
          thumbColor={isDark ? themeStyle.bg : themeStyle.bg}
          ios_backgroundColor={theme.buttonColor}
          onValueChange={toggleTheme}
          value={isDark}
        />
        <TouchableOpacity style={global.button} onPress={logout}>
          <Text style={[global.buttonText, global.bold]}>Logout</Text>
        </TouchableOpacity>
      </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
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
    width: 260,
    backgroundColor: theme.buttonColor,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical:20,
  },
  buttonText: {
    fontSize:26,
    color: theme.textDark,
    textAlign:'center',
  },
  
  logoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  buttonLogout:{
    backgroundColor: theme.buttonColor,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});