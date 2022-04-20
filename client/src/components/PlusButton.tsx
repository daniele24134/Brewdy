import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { theme } from "../theme";

export const PlusButton:React.FC = () => {
  return (
  <TouchableOpacity style={styles.buttonPlus}>
    <Text style={styles.textPlus}>+</Text>
  </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textPlus: {
    fontSize: 50,
    color: theme.textLight,
    fontWeight: '200'
  },
  buttonPlus: {
    width: 60,
    height: 60,
    backgroundColor: theme.buttonColor,
    borderRadius: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: theme.padding,
    right:theme.padding
  },
})
