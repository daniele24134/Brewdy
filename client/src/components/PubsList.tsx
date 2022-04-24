import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { global, theme } from "../theme";
import { Pub } from "../types";

type PubsListProps = {
  pubs: Pub[]
}

export const PubsList: React.FC<PubsListProps> = ({pubs}) => {

  return (
    <View>
      {pubs.map(pub => (
        <Text style={[styles.name, global.medium]} key={pub.id}>{pub.name}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    color: theme.textDark
  }
});