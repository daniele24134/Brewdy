import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { theme } from "../theme";
import { EmailIcon, PasswordIcon, UserIcon } from "./Icons";


type SignInputProps = {
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  placeholder: string,
  isPassword?: boolean
}

export const SignInput: React.FC<SignInputProps> = ({value, setValue, placeholder, isPassword}) => {

  const [pressed, setPressed] = useState(false)

  return (
    <View style={pressed ? [styles.input, styles.focus] : styles.input}>
      {placeholder === 'EMAIL' ? 
        <View style={styles.icon}>
          <EmailIcon size={20} color={pressed ? '#000' : undefined}/>
        </View> : 
      undefined}
      {placeholder === 'PASSWORD' ?
        <View style={styles.icon}>
          <PasswordIcon size={20} color={pressed ? '#000' : undefined} />
        </View> :
        undefined}

      {placeholder === 'USERNAME' ?
        <View style={styles.icon}>
          <UserIcon size={20} color={pressed ? '#000' : undefined} />
        </View> :
        undefined}

      <TextInput
        style={styles.inputField}
        placeholder={placeholder}
        onFocus={() => setPressed(true)}
        onBlur={() => setPressed(false)}
        onChangeText={setValue}
        value={value}
        placeholderTextColor='#ccc'
        autoCapitalize='none'
        secureTextEntry={isPassword}
        
      />
    </View>

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
    fontWeight: '600',
    flexDirection:'row',
    alignItems:'center'
  },
  inputField: {
    height: 45,
    width: '100%',
  },
  focus: {
    backgroundColor: theme.bgLight,
    color: theme.textLight,
  },
  icon: {
    position: 'relative',
    marginRight: 10
  }
});