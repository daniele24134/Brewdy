import React from "react";
import { Switch } from "react-native";
import { theme } from "../theme";
import { useThemeContext } from "../Theme.provider";
import { Pub } from "../types";

type SwitchPubProps = {
  addPub: (pubId: number) => void,
  deletePub: (pubId: number) => void,
  pubId: number,
  isSelected: (pubId: number) => boolean
}

export const SwitchPub: React.FC<SwitchPubProps> = ({ addPub, deletePub, pubId, isSelected }) => {

  const [selected, setSelected] = React.useState(isSelected(pubId));
  const { themeStyle } = useThemeContext();

  const togglePub = () => {
    if (!selected) {
      addPub(pubId);
      setSelected(true)
    } else {
      deletePub(pubId);
      setSelected(false);
    }
  }

  return (
    <Switch
      trackColor = {{ false: theme.buttonColor, true: theme.buttonColor }}
      thumbColor = { !selected ? themeStyle.text : theme.green }
      ios_backgroundColor = { theme.buttonColor }
      onValueChange = { togglePub }
      value = { selected }
    />
  );
}

