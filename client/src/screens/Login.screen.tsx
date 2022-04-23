import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, Alert } from "react-native";
import { theme, global } from "../theme";
import { SignInput } from '../components/Input';
import { fetchLogin } from "../services/backService";
import { useUserContext } from "../User.provider";
import { UserData } from "../types";

export const Signin:React.FC = ({navigation}: any) => {
  const {login} = useUserContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {

    const result = fetchLogin({email, password});

    result.then(
      (data: UserData) => {
        login(data);
      },
      (e: any) => {
        if (e) Alert.alert('Username/Password not correct');
      }
    )
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.loginTitle, global.bold]}>Login</Text>
      <Text style={[styles.loginSubtitle, global.semibold]}>Please sign in to continue.</Text>
      <SignInput 
        value={email} 
        setValue={setEmail}
        placeholder={'EMAIL'}
      />
      <SignInput
        isPassword={true}
        value={password}
        setValue={setPassword}
        placeholder={'PASSWORD'}
      />
      
      <TouchableOpacity onPress={handleLogin} style={[global.button,styles.loginButton]}>
        <Text style={[styles.loginButtonText, global.bold]}>LOGIN</Text>
      </TouchableOpacity>

      <View style={styles.redirect}>
        <Text style={[styles.loginButtonText, global.semibold]}>Don't have an account? </Text>
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text style={[global.bold, styles.signUpButton]}> Sign up</Text>
          </Pressable>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: theme.bgDark,
    padding: theme.padding
  },
  loginTitle: {
    color: theme.buttonColor,
    fontSize: 40,

    marginTop: '60%',
    marginBottom:5
  },
  loginSubtitle:{
    fontSize: 16, 
    color: theme.textDark, 
    marginBottom: 30,

  },
  loginButton: {
    alignSelf: 'flex-end',
    borderRadius: 50,
    marginTop: 30,
  },
  redirect: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '70%'
  },
  loginButtonText: {
    color: theme.textDark,
    fontSize: 15
  },
  signUpButton:{
    color: theme.buttonColor,
    fontSize: 15
  }
});