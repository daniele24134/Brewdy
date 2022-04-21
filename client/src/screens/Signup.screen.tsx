import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable } from "react-native";
import { theme, global } from "../theme";
import { SignInput } from '../components/Input';

export const Signup: React.FC = ({ navigation }: any) => {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.loginTitle}>Create Account</Text>
      <SignInput
        value={username}
        setValue={setUsername}
        placeholder={'USERNAME'}
      />
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

      <TouchableOpacity style={[global.button, styles.loginButton]}>
        <Text style={{ color: theme.textDark, fontWeight: '700' }}>SIGN UP</Text>
      </TouchableOpacity>

      <View style={styles.redirect}>
        <Text style={{ color: theme.textDark }}>Already have an account? </Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={{ color: theme.buttonColor, fontWeight: '700' }}> Sign in</Text>
        </Pressable>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgDark,
    padding: theme.padding
  },
  loginTitle: {
    color: theme.buttonColor,
    fontSize: 40,
    fontWeight: '700',
    marginTop: '50%',
    marginBottom: 30
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