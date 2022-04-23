import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, Alert } from "react-native";
import { theme, global } from "../theme";
import { SignInput } from '../components/Input';
import { createUser } from "../services/backService";
import { useUserContext } from "../User.provider";
import { UserData } from "../types";

export const Signup: React.FC = ({ navigation }: any) => {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUserContext();

  const handleCreate = async () => {

    if (email && username && password) {
      if (password.length < 6) {
        Alert.alert('Password must be longer than 6 characters');
      } else {
        const result = createUser({email, username, password});

        result.then(
          (data: UserData) => {
            login(data);
          },
          (e: any) => {
            if (e) Alert.alert('This account already exists');
          }
        )
      }

    } else {
      Alert.alert('All fields are required');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.loginTitle, global.bold]}>Create Account</Text>
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

      <TouchableOpacity onPress={handleCreate} style={[global.button, styles.loginButton]}>
        <Text style={[global.bold,styles.text]}>SIGN UP</Text>
      </TouchableOpacity>

      <View style={styles.redirect}>
        <Text style={[global.semibold,styles.text]}>Already have an account? </Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={[global.bold,styles.signInButton]}> Sign in</Text>
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
  },
  text: {
    fontSize: 15,
    color: theme.textDark
  },
  signInButton: {
    fontSize: 15,
    color: theme.buttonColor
  }
});