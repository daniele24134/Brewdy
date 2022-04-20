import React, {useState} from "react";
import { StyleSheet, Pressable } from "react-native";
import { theme } from "../theme";

type ColorProps = {
  toggleColor: (c: string) => void ,
  nameColor: string,
  color: string,
  isPressed: boolean
}

export const Color:React.FC<ColorProps> = (props) => {

  const handlePress = () => {
    props.toggleColor(props.nameColor);
  }

  const press = props.isPressed ? styles.pressed : undefined

  return (
    <Pressable
      style={[{
        backgroundColor: props.color
      }, styles.color, press]}
      onPress={handlePress}
    >
    </Pressable>
  );

}

const styles = StyleSheet.create({
  color: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginLeft: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.6
  },
  pressed: {
    borderColor: theme.bgLight,
    borderWidth: 3,
    shadowOpacity: 1,
    shadowOffset: {
      width: 5,
      height: 5
    },

  }
})