import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable } from "react-native";
import { theme, global } from "../theme";
import { SignInput } from '../components/Input';
import { fetchLogin } from "../services/backService";
import { useUserContext } from "../User.provider";

export const Signin:React.FC = ({navigation}: any) => {
  const {login} = useUserContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {

    const result = await fetchLogin({email, password})
    if (result) {
      login();
    } else {
      console.warn('did not logged')
    }

  }

  return (
    <View style={styles.container}>
      <Text style={styles.loginTitle}>Login</Text>
      <Text style={styles.loginSubtitle}>Please sign in to continue.</Text>
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
        <Text style={{color: theme.textDark, fontWeight: '700'}}>LOGIN</Text>
      </TouchableOpacity>

      <View style={styles.redirect}>
        <Text style={{color:theme.textDark}}>Don't have an account? </Text>
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text style={{ color: theme.buttonColor, fontWeight: '700'}}> Sign up</Text>
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
    fontWeight: '700',
    marginTop: '60%',
    marginBottom:5
  },
  loginSubtitle:{
    fontSize: 16, color: theme.textDark, marginBottom: 30
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
  }
});