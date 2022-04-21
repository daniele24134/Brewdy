import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { theme } from "../theme";


type SignInputProps = {
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  placeholder: string,
  isPassword?: boolean
}

export const SignInput: React.FC<SignInputProps> = ({value, setValue, placeholder, isPassword}) => {

  const [pressed, setPressed] = useState(false)

  return (
    <TextInput
      style={pressed ? [styles.input, styles.focus] : [styles.input]}
      placeholder={placeholder}
      onFocus={() => setPressed(true)}
      onBlur={() => setPressed(false)}
      onChangeText={setValue}
      value={value}
      placeholderTextColor='#ccc'
      autoCapitalize='none'
      secureTextEntry={isPassword}
      
    />

  );
}


const styles = StyleSheet.create({
  input: {
    borderColor: theme.textDark,
    width: '100%',
    height: 45,
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    color: theme.textDark,
    fontSize: 14,
    fontWeight: '600'
  },
  focus: {
    backgroundColor: theme.bgLight,
    color: theme.textLight,
  },
});